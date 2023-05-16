import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export const formatDate = (date: string): string => {
  const currentDate = dayjs(date);

  return currentDate.isBefore(dayjs().subtract(1, "d"))
    ? currentDate.format("MMMM D, YYYY")
    : currentDate.fromNow();
};
