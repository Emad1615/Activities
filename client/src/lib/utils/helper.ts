import { format } from "date-fns";
import type { DateArg } from "date-fns";
import z from "zod";
export const DateFormat = (date: string | Date, locale: string = "en-US") => {
  if (!date) return "";
  if (typeof date === "string") {
    date = new Date(date);
  }
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date);
};

export const fnFormat = (date: DateArg<Date>) => {
  return format(date, "dd MMM yyyy h:mm a");
};

export const requiredInput = (fieldName: string) =>
  z.string({ message: `${fieldName} is required` })
    .min(1, { message: `${fieldName} is required` });
