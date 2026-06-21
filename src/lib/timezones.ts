// IANA time zones. Prefers the full runtime list when the browser supports it,
// with a maintained fallback covering the common zones.
const FALLBACK_TIME_ZONES = [
  "Europe/Dublin",
  "Europe/London",
  "Europe/Berlin",
  "Europe/Paris",
  "Europe/Madrid",
  "Europe/Rome",
  "Europe/Lisbon",
  "Europe/Amsterdam",
  "Europe/Brussels",
  "Europe/Vienna",
  "Europe/Athens",
  "Europe/Helsinki",
  "Europe/Stockholm",
  "Europe/Warsaw",
  "Europe/Bucharest",
  "Asia/Kolkata",
  "Asia/Dubai",
  "Asia/Singapore",
  "Asia/Tokyo",
  "Asia/Shanghai",
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "America/Sao_Paulo",
  "Australia/Sydney",
  "UTC"
];

type IntlWithTimeZones = typeof Intl & { supportedValuesOf?: (key: string) => string[] };

export function getTimeZones(): string[] {
  try {
    const intl = Intl as IntlWithTimeZones;
    if (typeof intl.supportedValuesOf === "function") {
      const zones = intl.supportedValuesOf("timeZone");
      if (Array.isArray(zones) && zones.length) return zones;
    }
  } catch {
    // fall through to the maintained list
  }
  return FALLBACK_TIME_ZONES;
}
