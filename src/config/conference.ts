import { es } from "date-fns/locale";
import { formatInTimeZone } from "date-fns-tz";

const CONFERENCE_DATE = new Date("2025-09-10T17:00:00+02:00");

const getUserTimezone = () => {
	return typeof window !== "undefined"
		? Intl.DateTimeFormat().resolvedOptions().timeZone
		: "Europe/Madrid";
};

const getTimezoneAbbr = (date: Date, timezone: string) => {
	if (typeof window === "undefined") return "CEST";

	const formatter = new Intl.DateTimeFormat("en", {
		timeZone: timezone,
		timeZoneName: "short",
	});

	return (
		formatter.formatToParts(date).find((part) => part.type === "timeZoneName")
			?.value || "UTC"
	);
};

export const CONFERENCE_CONFIG = {
	EVENT_DATE: CONFERENCE_DATE,

	getFormattedDate: () => {
		const userTimezone = getUserTimezone();

		// Show date in user's timezone
		const day = formatInTimeZone(CONFERENCE_DATE, userTimezone, "d", {
			locale: es,
		});
		const month = formatInTimeZone(CONFERENCE_DATE, userTimezone, "MMMM", {
			locale: es,
		}).toUpperCase();
		const year = formatInTimeZone(CONFERENCE_DATE, userTimezone, "yyyy", {
			locale: es,
		});
		const time = formatInTimeZone(CONFERENCE_DATE, userTimezone, "HH:mm");
		const timezoneAbbr = getTimezoneAbbr(CONFERENCE_DATE, userTimezone);

		return {
			date: `${day} DE ${month} ${year}`,
			time: `${time}H ${timezoneAbbr}`,
			full: `${day} DE ${month} ${year} - ${time}H ${timezoneAbbr}`,
		};
	},

	getStaticFormattedDate: () => {
		const day = formatInTimeZone(CONFERENCE_DATE, "Europe/Madrid", "d", {
			locale: es,
		});
		const month = formatInTimeZone(CONFERENCE_DATE, "Europe/Madrid", "MMMM", {
			locale: es,
		}).toUpperCase();
		const year = formatInTimeZone(CONFERENCE_DATE, "Europe/Madrid", "yyyy", {
			locale: es,
		});
		const time = formatInTimeZone(CONFERENCE_DATE, "Europe/Madrid", "HH:mm");

		return {
			DATE: `${day} DE ${month} ${year}`,
			TIME: `${time}H CEST`,
			FULL: `${day} DE ${month} ${year} - ${time}H CEST`,
		};
	},
} as const;
