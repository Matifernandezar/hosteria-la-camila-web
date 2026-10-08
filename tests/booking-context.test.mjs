import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import ts from "typescript";

// Exercise the shared server/client validator without requiring a Next runtime.
const source = await readFile(new URL("../lib/booking-context.ts", import.meta.url), "utf8");
const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } });
const { parseBookingContext, bookingToday, nextBookingDay } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`);
const valid = { checkin: "2026-10-10", checkout: "2026-10-12", adults: "3", children: "1" };
const parse = (query) => parseBookingContext(query, "2026-10-08");

test("plain booking links need no enquiry; complete enquiries retain their values", () => {
  assert.deepEqual(parse({}), { status: "empty" });
  assert.deepEqual(parse(valid), { status: "valid", context: valid });
  assert.equal(parse({ ...valid, checkin: "2026-10-08", children: "0" }).status, "valid");
});
test("reject past, equal, reversed and impossible dates", () => {
  for (const dates of [
    { checkin: "2026-10-07" }, { checkout: "2026-10-10" }, { checkout: "2026-10-09" },
    { checkin: "2027-02-30", checkout: "2027-03-02" },
    { checkin: "2026-1-10" }, { checkin: "2026-10-10T00:00:00Z" },
  ]) assert.equal(parse({ ...valid, ...dates }).status, "invalid");
});
test("reject partial or duplicate queries and invalid guest counts", () => {
  assert.equal(parse({ checkin: valid.checkin }).status, "invalid");
  assert.equal(parse({ ...valid, checkin: [valid.checkin, valid.checkin] }).status, "invalid");
  for (const adults of ["0", "7", "2.5", "02", "NaN", ""]) assert.equal(parse({ ...valid, adults }).status, "invalid");
  for (const children of ["-1", "5", "1.5", "", "99"]) assert.equal(parse({ ...valid, children }).status, "invalid");
});
test("hotel date uses Buenos Aires across the UTC midnight boundary", () => {
  assert.equal(bookingToday(new Date("2026-10-09T01:00:00Z")), "2026-10-08");
  assert.equal(bookingToday(new Date("2026-10-09T03:00:00Z")), "2026-10-09");
});
test("checkout minimum handles leap days and year boundaries", () => {
  assert.equal(nextBookingDay("2028-02-28"), "2028-02-29");
  assert.equal(nextBookingDay("2028-02-29"), "2028-03-01");
  assert.equal(nextBookingDay("2026-12-31"), "2027-01-01");
  assert.equal(nextBookingDay("2027-02-29"), undefined);
  assert.equal(nextBookingDay(""), undefined);
});
