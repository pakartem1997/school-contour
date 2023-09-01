import React from 'react';
import { api } from '../../api/Api';
import styles from './Card.module.css';
import { Button } from '../Button';
import { Bike } from 'src/api/Api.types';
import clsx from 'clsx';

interface CardProps {
  onClick?: () => void;
  bike: Bike;
  rentButtonEnable?: boolean;
}

export const Card: React.FC<CardProps> = ({ onClick, bike, rentButtonEnable }) => {
  const srcImg = api.catalog.getBikeImagePath('/api/catalog/bike/:bikeId/img', { bikeId: bike._id, query: '' });

  return (
    <div
      className={clsx(styles.card, {
        [styles.cardNohover]: !rentButtonEnable,
      })}
    >
      <a className={styles.imgLink} onClick={onClick}>
        <img src={srcImg} alt="велосипед" />
      </a>

      <div>
        <div className={styles.title}>{bike.name}</div>
        <div className={styles.price}>{`${bike.cost} ₽/час`}</div>
      </div>

      {rentButtonEnable && (
        <div className={styles.bottom}>
          <Button className={styles.btn} onClick={onClick}>
            Арендовать
          </Button>
        </div>
      )}
    </div>
  );
};
