'use client';

import * as React from 'react';
import {Button} from '@/components/ui/button';
import {Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger} from '@/components/ui/drawer';
import {BasicMapExample} from './map-mapcn';
interface PickerLocationMapProps {
  pointName: string;
  lat?: number;
  lng?: number;
  onSelect: (lat?: number, lng?: number) => void;
}
const PickerLocationMap = ({pointName, onSelect, lat, lng}: PickerLocationMapProps) => {
  const defaultLocation = lat && lng ? [lat, lng] : undefined;
  const [location, setLocation] = React.useState<number[] | undefined>(defaultLocation);
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant='outline'>{location ? location?.join(' ,').slice(0, 10) : 'Open Drawer'}</Button>
      </DrawerTrigger>
      <DrawerContent className='mb-5'>
        <div className='mx-auto w-full max-w-3xl'>
          <DrawerHeader>
            <DrawerTitle>Select Location For {pointName} Point</DrawerTitle>
            <DrawerDescription>{location?.join(' ,')}</DrawerDescription>
          </DrawerHeader>
          <div className='h-100' onPointerDown={e => e.stopPropagation()} onTouchStart={e => e.stopPropagation()}>
            <BasicMapExample
              pointName={pointName}
              onSelect={(lat, lng) => {
                setLocation([lat, lng]);
                onSelect(lat, lng);
              }}
            />
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button>Submit</Button>
            </DrawerClose>
            <DrawerClose asChild>
              <Button
                onClick={() => {
                  onSelect(undefined, undefined);
                  setLocation(undefined);
                }}
                variant='outline'
              >
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default PickerLocationMap;
