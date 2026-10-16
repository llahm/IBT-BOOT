export const etb = new Intl.NumberFormat("en-ET", {
  style: "currency",
  currency: "ETB",
  maximumFractionDigits: 0,
});

export const when = new Intl.DateTimeFormat("en-ET", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Africa/Addis_Ababa",
});

const relativeFormatter = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
export function relative(timestamp) {
  const elapsedMinutes = Math.round((new Date(timestamp).getTime() - Date.now()) / 60000);
  if (Math.abs(elapsedMinutes) < 60) return relativeFormatter.format(elapsedMinutes, "minute");
  const elapsedHours = Math.round(elapsedMinutes / 60);
  if (Math.abs(elapsedHours) < 24) return relativeFormatter.format(elapsedHours, "hour");
  return relativeFormatter.format(Math.round(elapsedHours / 24), "day");
}
