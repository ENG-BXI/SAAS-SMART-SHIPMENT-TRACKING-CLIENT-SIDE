import {clsx, type ClassValue} from 'clsx';
import {twMerge} from 'tailwind-merge';
import jwt from 'jsonwebtoken';
import CONFIG from '@/lib/config';
import { IUser } from '@/Interfaces/IUser';
import Cookies from 'universal-cookie'
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function ConcatListOfString(list: string[], numberOfCharacter?: number) {
  const text = list.join(', ');
  return text.length > (numberOfCharacter || 25) ? text.slice(0, numberOfCharacter || 25) + '...' : text;
}

export function getUser(token: string) {
  try {
    const userDecoded = jwt.verify(token, CONFIG.SECRET_KEY);
    if (!userDecoded) {
      return null;
    }
    return userDecoded as IUser;
  } catch (error) {
    const cookie = new Cookies();
    cookie.remove('token');
    console.log(error);
    return null;
  }
}

export function formattedDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  });
}

export function formattedDateTime(date: string) {
  return new Date(date).toLocaleDateString('ar-EG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  });
}

