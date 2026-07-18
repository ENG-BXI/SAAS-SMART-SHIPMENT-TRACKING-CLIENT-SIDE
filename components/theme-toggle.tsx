'use client';

import * as React from 'react';
import {Moon, Sun} from 'lucide-react';
import {useTheme} from 'next-themes';

import {Button} from '@/components/ui/button';
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from './ui/dropdown-menu';
import {cn} from '@/lib/utils';
interface ModeToggleProps {
  showText?: boolean;
}
export function ModeToggle({showText = false}: ModeToggleProps) {
  const {setTheme} = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className='z-50'>
        <Button variant='outline' className={cn(showText && 'w-full max-w-130 justify-start')}>
          <Sun className='h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all text-black dark:scale-0 dark:-rotate-90' />
          <Moon className='absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0' />
          <span className={cn(!showText && 'sr-only')}>Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={() => setTheme('light')}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
