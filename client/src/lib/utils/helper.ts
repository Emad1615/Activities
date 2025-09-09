import { format, formatDistanceToNow } from 'date-fns';
import type { DateArg } from 'date-fns';
import z from 'zod';
export const DateFormat = (date: string | Date, locale: string = 'en-US') => {
  if (!date) return '';
  if (typeof date === 'string') {
    date = new Date(date);
  }
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(date);
};

export function timeAgo(date: DateArg<Date>) {
  return formatDistanceToNow(date, { addSuffix: true });
}

export const fnFormat = (date: DateArg<Date>) => {
  return format(date, 'dd MMM yyyy h:mm a');
};
export const fnDateFormat = (date: DateArg<Date>) => {
  return format(date, 'dd MMMM yyyy');
};
export const requiredInput = (fieldName: string) =>
  z
    .string({ message: `${fieldName} is required` })
    .min(1, { message: `${fieldName} is required` });

const AllowAnonymousPages = [
  '/',
  '/login',
  '/register',
  '/not-found',
  '/server-error',
];
export const isAllowAnonymousPage = (pathName: string) => {
  return !AllowAnonymousPages.includes(pathName);
};
const AuthorizedPages = [
  '/',
  '/activities',
  '/activities/:id',
  '/createActivity',
  '/manage/:id',
];

export const isEnabled = (pathName: string, IsAuthenticated: boolean) => {
  return AuthorizedPages.includes(pathName) && !IsAuthenticated ? false : true;
};
