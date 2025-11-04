import { Box, Skeleton } from '@mui/material';
import { Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import IconMaker from 'leaflet/dist/images/marker-icon.png';
import { lazy, Suspense } from 'react';
const LazyMapContainer = lazy(() =>
  import('react-leaflet').then((module) => ({ default: module.MapContainer }))
);
type Props = {
  position: [number, number];
  venue: string;
};
export default function Map({ position, venue }: Props) {
  const renderFallback = () => (
    <Skeleton
      variant="rectangular"
      sx={{
        top: 0,
        left: 0,
        width: 1,
        height: 1,
        position: 'absolute',
      }}
    />
  );
  return (
    <Box>
      <Suspense fallback={renderFallback()}>
        <LazyMapContainer
          center={position}
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: 330 }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={position} icon={new Icon({ iconUrl: IconMaker })}>
            <Popup>{venue}</Popup>
          </Marker>
        </LazyMapContainer>
      </Suspense>
    </Box>
  );
}
