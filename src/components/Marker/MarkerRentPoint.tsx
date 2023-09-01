import React from 'react';
import * as ymaps3 from 'ymaps3';
import { useYMapsContext } from '../YMapsContext';
import MarkerImg from '../../img/marker.svg';
import styles from './MarkerRentPoint.module.css';

interface MarkerRentPointProps {
  coordinates: [number, number];
  address?: string;
}

export const MarkerRentPoint: React.FC<MarkerRentPointProps> = ({ coordinates, address }) => {
  const { isAPILoaded, reactify, ymaps3MarkersModule } = useYMapsContext();

  if (!isAPILoaded || !reactify || !ymaps3MarkersModule || !coordinates) {
    return <div>Грузим карту...</div>;
  }

  const { YMapMarker } = reactify.module(ymaps3);

  return (
    <YMapMarker coordinates={coordinates} zIndex={1}>
      <MarkerImg />
      <div className={styles.address}>{address}</div>
    </YMapMarker>
  );
};
