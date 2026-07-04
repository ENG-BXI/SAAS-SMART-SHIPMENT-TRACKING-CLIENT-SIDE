'use client';
import {useEffect, useState} from 'react';
import {Map, MapControls, MapMarker, MapRoute, MarkerContent, MarkerPopup, MarkerTooltip, useMap, type MapViewport} from '@/components/ui/map';
import {cn} from '@/lib/utils';
import {useTheme} from 'next-themes';
interface BasicMapExampleProps {
  allPoint: {name: string; isCurrent: boolean; lat?: number | undefined; lng?: number | undefined}[];
}
export function BasicMapExample({allPoint}: BasicMapExampleProps) {
  const {theme} = useTheme();
  const currentPoint = allPoint.filter(point => {
    return point.isCurrent;
  })[0];
  const [viewport, setViewport] = useState<MapViewport>({
    center: [-74.006, 40.7128],
    zoom: 8,
    bearing: 0,
    pitch: 0
  });
  return (
    <div className='relative h-105 w-full rounded-xl overflow-hidden'>
      <Map theme={theme as 'light' | 'dark'} viewport={viewport} onViewportChange={setViewport}>
        <MapEventListener currentPoint={currentPoint} />
        <MapControls showCompass showFullscreen showLocate />
        {allPoint[0].lat && (
          <MapRoute
            coordinates={allPoint.map(point => {
              return [point.lng || 0, point.lat || 0];
            })}
            color='green'
          />
        )}
        {allPoint[0].lat &&
          allPoint.map(point => {
            return (
              <MapMarker key={point.name} longitude={point.lng||0} latitude={point.lat||0}>
                <MarkerContent>
                  <div className={cn('bg-primary size-4 rounded-full border-2 border-white shadow-lg', point.isCurrent && 'bg-green-500 animate-heartbeat scale-125 duration-75')} />
                </MarkerContent>
                <MarkerTooltip>{point.name}</MarkerTooltip>
                <MarkerPopup>
                  <div className='space-y-1'>
                    <p className='text-foreground font-medium'>{point.name}</p>
                    <p className='text-muted-foreground text-xs'>
                      {point.lat}, {point.lng}
                    </p>
                  </div>
                </MarkerPopup>
              </MapMarker>
            );
          })}
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
  currentPoint: {
    name: string;
    isCurrent: boolean;
    lat?: number | undefined;
    lng?: number | undefined;
  };
}
function MapEventListener({currentPoint}: MapEventListenerProps) {
  const {map} = useMap();
  useEffect(() => {
    function goToMyLocation() {
      if (!navigator.geolocation) return;
      navigator.geolocation.getCurrentPosition(pos => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        if (currentPoint.lng && currentPoint.lat) {
          map?.flyTo({
            center: [currentPoint.lng, currentPoint.lat],
            zoom: 10
          });
        } else {
          map?.flyTo({
            center: [lng, lat],
            zoom: 16
          });
        }
      });
    }
    goToMyLocation();
  }, [currentPoint.lat, currentPoint.lng, map]);

  return null;
}
