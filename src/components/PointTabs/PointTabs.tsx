import React, { useMemo } from 'react';
import styles from './PointTabs.module.css';
import { clsx } from 'clsx';
import { RentPoint } from '../../api/Api.types';
import { useSearchParams } from 'react-router-dom';

interface Props {
  points: RentPoint[];
  paramQueryName?: string;
}

export const PointTabs: React.FC<Props> = ({ points = [], paramQueryName = 'pointId' }) => {
  const [searchParams, updateSearchParams] = useSearchParams();

  const currentPointId = useMemo(() => {
    const candidate = searchParams.get(paramQueryName);
    return candidate || '';
  }, [searchParams]);

  const handlePageChange = (value: string) => {
    searchParams.set(paramQueryName, value.toString());
    updateSearchParams(searchParams);
  };

  return (
    <section className={styles.tabs}>
      {points.map(({ address, _id }) => {
        return (
          <a
            key={_id}
            className={clsx(styles.tabsLink, { [styles.active]: currentPointId === _id })}
            onClick={() => handlePageChange(_id)}
          >
            {' '}
            {address}{' '}
          </a>
        );
      })}
      <a
        className={clsx(styles.tabsLink, { [styles.active]: currentPointId === '' })}
        onClick={() => handlePageChange('')}
      >
        Все пункты
      </a>
    </section>
  );
};
