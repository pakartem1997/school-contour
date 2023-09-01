import React, { useState } from 'react';
import * as ymaps3 from 'ymaps3';
import { useYMapsContext } from '../YMapsContext';
import MarkerImg from '../../img/marker.svg';
import styles from './MarkerAllPoints.module.css';
import Close from '../../img/close-mini.svg';
import { Button } from '../Button';

interface MarkerAllPointsProps {
  coordinates: [number, number];
  address: string;
  count: number;
  onClick?: () => void;
}

export const MarkerAllPoints: React.FC<MarkerAllPointsProps> = ({ coordinates, address, count, onClick }) => {
  const [balloonOpen, setBalloonOpen] = useState(false);
  const { reactify } = useYMapsContext();

  if (!reactify) {
    return <div>Грузим карту...</div>;
  }

  const { YMapMarker } = reactify.module(ymaps3);

  const handleClick = () => {
    if (!onClick) {
      return;
    }
    onClick();
  };

  return (
    <YMapMarker coordinates={coordinates} zIndex={1}>
      <MarkerImg className={styles.MarkerImg} onClick={() => setBalloonOpen(true)} />
      {balloonOpen && (
        <div className={styles.ballon}>
          <div className={styles.ballonHeader}>
            <Close className={styles.close} onClick={() => setBalloonOpen(false)} />
          </div>
          <div className={styles.ballonContent}>
            <div className={styles.address}>{address}</div>
            <div className={styles.count}>{`${count} велосипедов`}</div>
            <Button className={styles.button} onClick={handleClick}>
              Выбрать велосипед
            </Button>
          </div>
        </div>
      )}
    </YMapMarker>
  );
};
