import { format } from "date-fns";

export const getCurrentMonth = (): string => {
  return format(new Date(), "MM");
};
