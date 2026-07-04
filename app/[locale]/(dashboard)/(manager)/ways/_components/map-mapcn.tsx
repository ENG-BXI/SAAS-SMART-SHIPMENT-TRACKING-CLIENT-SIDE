'use client';

import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {Map, MapMarker, MarkerContent, MarkerPopup, MarkerTooltip, useMap, type MapViewport} from '@/components/ui/map';
import {Button} from '@/components/ui/button';
import {Mountain, RotateCcw} from 'lucide-react';
interface BasicMapExampleProps {
  pointName?: string;
  onSelect: (lat: number, lng: number) => void;
}
export function BasicMapExample({pointName, onSelect}: BasicMapExampleProps) {
  const [position, setPosition] = useState<{lng: number; lat: number}>();

  const [viewport, setViewport] = useState<MapViewport>({
    center: [-74.006, 40.7128],
    zoom: 8,
    bearing: 0,
    pitch: 0
  });
  return (
    <div className='relative h-105 w-full'>
      <Map viewport={viewport} onViewportChange={setViewport}>
        <MapEventListener setPosition={setPosition} onSelect={onSelect} />
        {position && (
          <MapMarker longitude={position.lng} latitude={position.lat}>
            <MarkerContent>
              <div className='bg-primary size-4 rounded-full border-2 border-white shadow-lg' />
            </MarkerContent>
            <MarkerTooltip>{pointName}</MarkerTooltip>
            <MarkerPopup>
              <div className='space-y-1'>
                <p className='text-foreground font-medium'>{pointName}</p>
                <p className='text-muted-foreground text-xs'>
                  {position.lat.toFixed(4)}, {position.lng.toFixed(4)}
                </p>
              </div>
            </MarkerPopup>
          </MapMarker>
        )}
        <MapController />
      </Map>
      <div className='bg-background/80 absolute top-2 left-2 z-10 flex flex-wrap gap-x-3 gap-y-1 rounded border px-2 py-1.5 font-mono text-xs backdrop-blur'>
        <span>
          <span className='text-muted-foreground'>lng:</span> {viewport.center[0].toFixed(3)}
        </span>
        <span>
          <span className='text-muted-foreground'>lat:</span> {viewport.center[1].toFixed(3)}
        </span>
        <span>
          <span className='text-muted-foreground'>zoom:</span> {viewport.zoom.toFixed(1)}
        </span>
        <span>
          <span className='text-muted-foreground'>bearing:</span> {viewport.bearing.toFixed(1)}°
        </span>
        <span>
          <span className='text-muted-foreground'>pitch:</span> {viewport.pitch.toFixed(1)}°
        </span>
      </div>
    </div>
  );
}
interface MapEventListenerProps {
  setPosition: Dispatch<
    SetStateAction<
      | {
          lng: number;
          lat: number;
        }
      | undefined
    >
  >;
  onSelect: (lat: number, lng: number) => void;
}
function MapEventListener({setPosition, onSelect}: MapEventListenerProps) {
  const {map, isLoaded} = useMap();

  useEffect(() => {
    if (!map || !isLoaded) return;
    map?.on('click', e => {
      onSelect(e.lngLat.lat, e.lngLat.lng);
      setPosition({lat: e.lngLat.lat, lng: e.lngLat.lng});
      map.flyTo({center: {lat: e.lngLat.lat, lng: e.lngLat.lng}, zoom: map.getMaxZoom()});
    });
  }, [map, isLoaded, onSelect, setPosition]);

  useEffect(() => {
    function goToMyLocation() {
      if (!navigator.geolocation) return;

      navigator.geolocation.getCurrentPosition(pos => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        setPosition({lat, lng});

        map?.flyTo({
          center: [lng, lat],
          zoom: 16
        });
      });
    }
    goToMyLocation();
  }, [map, setPosition]);

  return null;
}
function MapController() {
  const {map, isLoaded} = useMap();
  const [pitch, setPitch] = useState(0);
  const [bearing, setBearing] = useState(0);

  useEffect(() => {
    if (!map || !isLoaded) return;

    const handleMove = () => {
      setPitch(Math.round(map.getPitch()));
      setBearing(Math.round(map.getBearing()));
    };

    map.on('move', handleMove);
    return () => {
      map.off('move', handleMove);
    };
  }, [map, isLoaded]);

  const handle3DView = () => {
    map?.easeTo({
      pitch: 60,
      bearing: -20,
      duration: 1000
    });
  };

  const handleReset = () => {
    map?.easeTo({
      pitch: 0,
      bearing: 0,
      duration: 1000
    });
  };

  if (!isLoaded) return null;

  return (
    <div className='absolute top-3 right-3 z-10 flex flex-col gap-2'>
      <div className='flex gap-2'>
        <Button size='sm' variant='secondary' onClick={handle3DView}>
          <Mountain className='mr-1.5 size-4' />
          3D View
        </Button>
        <Button size='sm' variant='secondary' onClick={handleReset}>
          <RotateCcw className='mr-1.5 size-4' />
          Reset
        </Button>
      </div>
      <div className='bg-background/90 rounded-md border px-3 py-2 font-mono text-xs backdrop-blur'>
        <div>Pitch: {pitch}°</div>
        <div>Bearing: {bearing}°</div>
      </div>
    </div>
  );
}
