import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import duration from "dayjs/plugin/duration";
dayjs.extend(relativeTime);
dayjs.extend(duration);
const formatDate = (date) => dayjs(date).format("DD MMM YYYY");
const formatTime = (date) => dayjs(date).format("hh:mm A");
const formatDateTime = (date) => dayjs(date).format("DD MMM YYYY, hh:mm A");
const formatRelativeTime = (date) => dayjs(date).fromNow();
const formatDayMonth = (date) => dayjs(date).format("DD MMM");
const getDurationLabel = (pickupTime, dropTime) => {
  const diff = dayjs(dropTime).diff(dayjs(pickupTime));
  const dur = dayjs.duration(diff);
  const days = Math.floor(dur.asDays());
  const hours = dur.hours();
  const mins = dur.minutes();
  const parts = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (mins > 0) parts.push(`${mins}m`);
  return parts.join(" ") || "0m";
};
const isDateInFuture = (date) => dayjs(date).isAfter(dayjs());
const isDateInPast = (date) => dayjs(date).isBefore(dayjs());
const groupByDate = (items) => {
  const groups = {};
  const today = dayjs().startOf("day");
  const yesterday = dayjs().subtract(1, "day").startOf("day");
  items.forEach((item) => {
    const itemDate = dayjs(item.created_at).startOf("day");
    let label;
    if (itemDate.isSame(today)) label = "Today";
    else if (itemDate.isSame(yesterday)) label = "Yesterday";
    else label = itemDate.format("DD MMM YYYY");
    if (!groups[label]) groups[label] = [];
    groups[label].push(item);
  });
  return groups;
};
export {
  formatDate,
  formatDateTime,
  formatDayMonth,
  formatRelativeTime,
  formatTime,
  getDurationLabel,
  groupByDate,
  isDateInFuture,
  isDateInPast
};
