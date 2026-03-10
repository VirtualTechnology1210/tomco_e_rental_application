import { CURRENCY_SYMBOL } from './constants';

export const formatCurrency = (amount: number | string): string => {
    const num = typeof amount === 'string' ? parseFloat(amount) : amount;
    if (isNaN(num)) return `${CURRENCY_SYMBOL}0`;
    return `${CURRENCY_SYMBOL}${num.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
};

export const formatCompactCurrency = (amount: number | string): string => {
    const num = typeof amount === 'string' ? parseFloat(amount) : amount;
    if (isNaN(num)) return `${CURRENCY_SYMBOL}0`;
    if (num >= 100000) return `${CURRENCY_SYMBOL}${(num / 100000).toFixed(1)}L`;
    if (num >= 1000) return `${CURRENCY_SYMBOL}${(num / 1000).toFixed(1)}K`;
    return formatCurrency(num);
};

export const calculateCost = (
    pickupTime: string,
    dropTime: string,
    perHourCost: number,
    perDayCost: number,
): { total_hours: number; total_days: number; total_cost: number; billing_mode: 'HOURLY' | 'DAILY' } => {
    const pickup = new Date(pickupTime);
    const drop = new Date(dropTime);
    const diffMs = drop.getTime() - pickup.getTime();
    const totalHours = parseFloat((diffMs / (1000 * 60 * 60)).toFixed(2));
    const totalDays = parseFloat((diffMs / (1000 * 60 * 60 * 24)).toFixed(2));

    let totalCost: number;
    let billingMode: 'HOURLY' | 'DAILY';

    if (totalHours <= 12) {
        totalCost = parseFloat((Math.ceil(totalHours) * perHourCost).toFixed(2));
        billingMode = 'HOURLY';
    } else {
        const daysCharged = Math.ceil(totalDays);
        totalCost = parseFloat((daysCharged * perDayCost).toFixed(2));
        billingMode = 'DAILY';
    }

    return { total_hours: totalHours, total_days: totalDays, total_cost: totalCost, billing_mode: billingMode };
};
