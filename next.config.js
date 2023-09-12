/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    esmExternals: false, // THIS IS THE FLAG THAT MATTERS
  },
  async rewrites() {
	return [
		{
			source: "/ticket/:username",
			destination: "/?ticket=:username"
		}
	]
  }
}

module.exports = nextConfig
