import React, { useEffect, useState } from 'react';
import { api } from '../../api/Api';
import { Card } from '../../components/Card/Card';
import styles from './Booking.module.css';
import { clsx } from 'clsx';
import { Loader } from '../../components/Loader/Loader';

async function getOrders() {
  const res = await api.order.getOrders();

  const promises = res.map(async ({ bikeId }) => {
    const order = await api.catalog.getBike(bikeId);
    return {
      ...order,
    };
  });

  return Promise.all(promises);
}

export const Booking: React.FC = () => {
  const [bikesData, setBikesData] = useState<{ name: string; cost: number; img: string; _id: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setBikesData(await getOrders());
      setLoading(false);
    })();
  }, []);

  return (
    <>
      <h1 className={styles.title}>Мои бронирования</h1>
      {loading ? (
        <Loader />
      ) : (
        <section className={clsx('catalog', styles.catalogBooking)}>
          {bikesData.length > 0 ? (
            bikesData.map((bike) => <Card key={bike._id} bike={bike} />)
          ) : (
            <div className={styles.imgContainer}>
              <div className={styles.imgEmpty} />
              <div>Пока не бронировали</div>
            </div>
          )}
        </section>
      )}
    </>
  );
};
