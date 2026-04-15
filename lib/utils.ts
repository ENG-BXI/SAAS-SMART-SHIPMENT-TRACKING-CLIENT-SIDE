import {clsx, type ClassValue} from 'clsx';
import {twMerge} from 'tailwind-merge';
import jwt from 'jsonwebtoken';
import CONFIG from '@/lib/config';
import {IUser} from '@/Interfaces/IUser';
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function ConcatListOfString(list: string[], numberOfCharacter?: number) {
  const text = list.join(', ');
  return text.length > (numberOfCharacter || 25) ? text.slice(0, numberOfCharacter || 25) + '...' : text;
}

export function getUser(token: string) {
  const userDecoded = jwt.verify(token, CONFIG.SECRET_KEY);
  if (!userDecoded) {
    return null;
  }
  return userDecoded as IUser;
}
