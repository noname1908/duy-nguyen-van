import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 8,
  }).format(value);
};

export const parseCurrencyToNumber = (value: string) => {
  const locale = 'en-US';
  var thousandSeparator =
    Intl.NumberFormat(locale).formatToParts(11111)[1].value;
  var decimalSeparator = Intl.NumberFormat(locale).formatToParts(1.1)[1].value;

  return parseFloat(
    value
      .replace(new RegExp('\\' + thousandSeparator, 'g'), '')
      .replace(new RegExp('\\' + decimalSeparator), '.')
  );
};
