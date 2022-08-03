const chromium = require('chrome-aws-lambda');
const { createClient } = require('@supabase/supabase-js');

const isLocal = process.env.NETLIFY_LOCAL === 'true';
const supabaseUrl = process.env.PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const LOCAL_CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const LOCAL_URL = 'http://localhost:3000/ticket?static=true&username=';

const getConfig = async () => {
	const executablePath = isLocal ? LOCAL_CHROME_PATH : await chromium.executablePath;
	const url = isLocal ? LOCAL_URL : 'https://miduconf.com/ticket?static=true&username=';

	return { executablePath, url };
};

const returnImage = (buffer) => ({
	headers: {
		'Content-Type': 'image/png',
	},
	statusCode: 200,
	body: buffer.toString('base64'),
	isBase64Encoded: true,
});

exports.handler = async function (event) {
	const {
		queryStringParameters: { username, skipCache },
	} = event;

	// check if image is already available in supabase to return it
	if (!skipCache) {
		const { error, data } = await supabase.from('ticket').select('image').eq('user_name', username);

		const [{ image }] = data ?? [];

		if (!error && image) {
			const res = await fetch(image);
			const blob = await res.arrayBuffer();
			return returnImage(Buffer.from(blob));
		}
	}

	// if not available, create the image
	const { executablePath, url } = await getConfig();

	const browser = await chromium.puppeteer.launch({
		args: chromium.args,
		defaultViewport: chromium.defaultViewport,
		executablePath,
		headless: true,
		ignoreHTTPSErrors: true,
	});

	const page = await browser.newPage();
	await page.setViewport({
		width: 1200,
		height: 800,
		deviceScaleFactor: 2,
	});

	await page.goto(`${url}${username}`);

	const el = await page.$('.atropos');

	const screenshot = await el.screenshot();

	await browser.close();

	return returnImage(screenshot);
};
