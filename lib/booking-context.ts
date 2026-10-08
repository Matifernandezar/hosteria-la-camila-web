export type BookingContext = {
  checkin: string;
  checkout: string;
  adults: string;
  children: string;
};

type Query = Record<string, string | string[] | undefined>;
type BookingContextResult =
  | { status: "empty" }
  | { status: "invalid" }
  | { status: "valid"; context: BookingContext };

export function bookingToday(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en", {
    timeZone: "America/Argentina/Buenos_Aires",
    year: "numeric", month: "2-digit", day: "2-digit",
  }).formatToParts(now);
  const part = (type: string) => parts.find((p) => p.type === type)!.value;
  return `${part("year")}-${part("month")}-${part("day")}`;
}

function isDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

export function nextBookingDay(value: string) {
  if (!isDate(value)) return undefined;
  const date = new Date(`${value}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + 1);
  return date.toISOString().slice(0, 10);
}

export function parseBookingContext(query: Query, today = bookingToday()): BookingContextResult {
  const keys = ["checkin", "checkout", "adults", "children"] as const;
  if (keys.every((key) => query[key] === undefined)) return { status: "empty" };
  if (keys.some((key) => typeof query[key] !== "string")) return { status: "invalid" };
  const { checkin, checkout, adults, children } = query as BookingContext;
  if (!isDate(checkin) || !isDate(checkout) || checkin < today || checkout <= checkin ||
      !/^[1-6]$/.test(adults) || !/^[0-4]$/.test(children)) return { status: "invalid" };
  return { status: "valid", context: { checkin, checkout, adults, children } };
}
