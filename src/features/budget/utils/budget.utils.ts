export const daysUntil = (value: string | null): number | null => {
  if (!value) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(value);
  due.setHours(0, 0, 0, 0);
  return Math.round((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
};

export const deadlineColor = (days: number | null): string => {
  if (days === null) return "text.secondary";
  if (days < 0) return "error.main";
  if (days <= 7) return "warning.main";
  if (days <= 30) return "primary.main";
  return "success.main";
};

export const deadlineLabel = (days: number | null): string => {
  if (days === null) return "No deadline";
  if (days < 0) return `${Math.abs(days)}d overdue`;
  if (days === 0) return "Today";
  if (days === 1) return "Tomorrow";
  return `${days}d left`;
};
