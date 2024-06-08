import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate = (date: Date) => {
  return date.toLocaleString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
  });
};

export const extractDataFromResponse = (res: any) => {
  const label: number[] = [];
  const data: number[] = [];
  res.forEach((item: any) => {
      label.push(item.wind);
      data.push(item.leistung);
  });
  return { label, data };
};