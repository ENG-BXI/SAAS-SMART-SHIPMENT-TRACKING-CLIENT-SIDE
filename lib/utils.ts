import {clsx, type ClassValue} from 'clsx';
import {twMerge} from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function ConcatListOfString(list: string[], numberOfCharacter?: number) {
  const text = list.join(', ');
  return text.length > (numberOfCharacter || 25) ? text.slice(0, numberOfCharacter || 25) + '...' : text;
}
