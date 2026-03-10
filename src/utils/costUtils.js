import { CURRENCY_SYMBOL } from "./constants";
const formatCurrency = (amount) => {
  const num = typeof amount === "string" ? parseFloat(amount) : amount;
  if (isNaN(num)) return `${CURRENCY_SYMBOL}0`;
  return `${CURRENCY_SYMBOL}${num.toLocaleString("en-IN", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
};
const formatCompactCurrency = (amount) => {
  const num = typeof amount === "string" ? parseFloat(amount) : amount;
  if (isNaN(num)) return `${CURRENCY_SYMBOL}0`;
  if (num >= 1e5) return `${CURRENCY_SYMBOL}${(num / 1e5).toFixed(1)}L`;
  if (num >= 1e3) return `${CURRENCY_SYMBOL}${(num / 1e3).toFixed(1)}K`;
  return formatCurrency(num);
};
const calculateCost = (pickupTime, dropTime, perHourCost, perDayCost) => {
  const pickup = new Date(pickupTime);
  const drop = new Date(dropTime);
  const diffMs = drop.getTime() - pickup.getTime();
  const totalHours = parseFloat((diffMs / (1e3 * 60 * 60)).toFixed(2));
  const totalDays = parseFloat((diffMs / (1e3 * 60 * 60 * 24)).toFixed(2));
  let totalCost;
  let billingMode;
  if (totalHours <= 12) {
    totalCost = parseFloat((Math.ceil(totalHours) * perHourCost).toFixed(2));
    billingMode = "HOURLY";
  } else {
    const daysCharged = Math.ceil(totalDays);
    totalCost = parseFloat((daysCharged * perDayCost).toFixed(2));
    billingMode = "DAILY";
  }
  return { total_hours: totalHours, total_days: totalDays, total_cost: totalCost, billing_mode: billingMode };
};
export {
  calculateCost,
  formatCompactCurrency,
  formatCurrency
};
