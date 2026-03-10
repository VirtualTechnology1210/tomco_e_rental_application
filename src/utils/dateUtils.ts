import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import duration from 'dayjs/plugin/duration';

dayjs.extend(relativeTime);
dayjs.extend(duration);

export const formatDate = (date: string | Date): string => dayjs(date).format('DD MMM YYYY');
export const formatTime = (date: string | Date): string => dayjs(date).format('hh:mm A');
export const formatDateTime = (date: string | Date): string => dayjs(date).format('DD MMM YYYY, hh:mm A');
export const formatRelativeTime = (date: string | Date): string => dayjs(date).fromNow();
export const formatDayMonth = (date: string | Date): string => dayjs(date).format('DD MMM');

export const getDurationLabel = (pickupTime: string, dropTime: string): string => {
    const diff = dayjs(dropTime).diff(dayjs(pickupTime));
    const dur = dayjs.duration(diff);
    const days = Math.floor(dur.asDays());
    const hours = dur.hours();
    const mins = dur.minutes();
    const parts: string[] = [];
    if (days > 0) parts.push(`${days}d`);
    if (hours > 0) parts.push(`${hours}h`);
    if (mins > 0) parts.push(`${mins}m`);
    return parts.join(' ') || '0m';
};

export const isDateInFuture = (date: string | Date): boolean => dayjs(date).isAfter(dayjs());
export const isDateInPast = (date: string | Date): boolean => dayjs(date).isBefore(dayjs());

export const groupByDate = <T extends { created_at: string }>(items: T[]): Record<string, T[]> => {
    const groups: Record<string, T[]> = {};
    const today = dayjs().startOf('day');
    const yesterday = dayjs().subtract(1, 'day').startOf('day');

    items.forEach((item) => {
        const itemDate = dayjs(item.created_at).startOf('day');
        let label: string;
        if (itemDate.isSame(today)) label = 'Today';
        else if (itemDate.isSame(yesterday)) label = 'Yesterday';
        else label = itemDate.format('DD MMM YYYY');
        if (!groups[label]) groups[label] = [];
        groups[label].push(item);
    });

    return groups;
};
