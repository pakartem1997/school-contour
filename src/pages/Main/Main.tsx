import React, { useEffect, useState } from 'react';
import styles from './Main.module.css';
import { Button } from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { MainYMap } from '../../components/MainYMap/MainYMap';
import { api } from '../../api/Api';
import { RentPoint } from '../../api/Api.types';

export const Main: React.FC = () => {
  const navigate = useNavigate();
  const [points, setPoints] = useState<RentPoint[]>([]);

  useEffect(() => {
    (async () => {
      setPoints(await api.point.getPoints());
    })();
  }, []);

  return (
    <>
      <section className={styles.landing}>
        <h1 className={styles.title}>Сервис аренды велосипедов</h1>
        <p className={styles.subtitle}>240 велосипедов в Новосибирске</p>
        <div className={styles.actions}>
          <Button className={styles.button} onClick={() => navigate('/catalog')}>
            Выбрать велосипед
          </Button>
          <a href="#map-page">Пункты проката</a>
        </div>
      </section>
      <section className={styles.map}>
        <h2 className={styles.mapTitle} id="map-page">
          Пункты проката
        </h2>
        <div className={styles.mapContainer}>
          <MainYMap points={points} />
        </div>
      </section>
    </>
  );
};
