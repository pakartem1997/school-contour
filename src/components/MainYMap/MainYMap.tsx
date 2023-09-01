import React from 'react';
import * as ymaps3 from 'ymaps3';
import { useYMapsContext } from '../YMapsContext';
import styles from './MainYMap.module.css';
import { MarkerAllPoints } from '../Marker/MarkerAllPoints';
import { RentPoint } from 'src/api/Api.types';
import { MarkerRentPoint } from '../Marker/MarkerRentPoint';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../helpers/useTheme';

interface MainYMapProps {
  zoom?: number;
  points?: RentPoint[];
  pointRent?: {
    address: string;
    coordinates: number[];
  };
  typeMarker?: string;
}

export function MainYMap({ points, pointRent, zoom = 12, typeMarker = 'MarkerAllPoints' }: MainYMapProps) {
  const { reactify } = useYMapsContext();
  const imperativeMapRef = React.useRef<ymaps3.YMap>();
  const navigate = useNavigate();
  const { theme } = useTheme();

  if (!reactify) {
    return <div>Грузим карту...</div>;
  }

  const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer } = reactify.module(ymaps3);
  let coordinatesOfMapCenter: ymaps3.LngLat = [82.936682, 55.00983];

  if (typeMarker === 'MarkerRentPoint' && pointRent?.coordinates) {
    coordinatesOfMapCenter = [pointRent?.coordinates[1], pointRent?.coordinates[0]];
  }

  return (
    <div className={styles.mapContainer}>
      <YMap location={{ center: coordinatesOfMapCenter, zoom }} mode="vector" ref={imperativeMapRef}>
        <YMapDefaultSchemeLayer theme={theme} />
        <YMapDefaultFeaturesLayer />
        {typeMarker === 'MarkerAllPoints' &&
          points?.map((point) => (
            <MarkerAllPoints
              key={point._id}
              coordinates={[point.coordinates[1], point.coordinates[0]]}
              address={point.address}
              count={point.bikesList.length}
              onClick={() => navigate(`/catalog?pointId=${point._id}`)}
            />
          ))}
        {typeMarker === 'MarkerRentPoint' && pointRent && (
          <MarkerRentPoint
            coordinates={[pointRent.coordinates[1], pointRent.coordinates[0]]}
            address={pointRent?.address}
          />
        )}
      </YMap>
    </div>
  );
}
