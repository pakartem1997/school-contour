import React, { useState } from 'react';
import { Modal } from '../Modal';
import { Button } from '../Button';
import styles from './BikeModal.module.css';
import { api } from '../../api/Api';
import { useNavigate } from 'react-router-dom';
import { bikeModalData } from '../../pages/Catalog/Catalog';
import { MainYMap } from '../MainYMap/MainYMap';

export interface LoginFormData {
  email: string;
  password: string;
}

interface Props {
  onClose: () => void;
  bike: bikeModalData;
  mapData: {
    address: string;
    coordinates: number[];
  };
}

export const BikeModal = ({ onClose, bike, mapData }: Props) => {
  const srcImg = api.catalog.getBikeImagePath('/api/catalog/bike/:bikeId/img', { bikeId: bike.bikeId, query: '' });
  const [srcQRCode, setSrcQRCode] = useState('');
  const [orderId, setOrderId] = useState('');
  const navigate = useNavigate();

  const handleRentClick = async () => {
    bike.bikeIsRented = true;
    const { _id } = await api.order.createOrder(bike.bikeId);
    setOrderId(_id);
    const srcQRCode = (await api.order.getQRCode(_id)).code;
    setSrcQRCode(srcQRCode);
  };

  const handleScanQRCodeClick = () => {
    api.order.startRent(orderId);
    navigate('/booking');
  };

  return (
    <Modal width={800} title={bike.title} onClose={onClose} cost={bike.cost} enableCostInHeader={srcQRCode !== ''}>
      <div className={styles.bikeTop}>
        <div className={styles.bikeImg}>
          <img src={srcImg} alt="велосипед" />
        </div>

        {srcQRCode === '' ? (
          <aside className={styles.bikeInfo}>
            <div className={styles.bikePrice}>{`${bike.cost} ₽/час`} </div>
            <Button wide onClick={handleRentClick}>
              Арендовать
            </Button>
          </aside>
        ) : (
          <aside className={styles.asideQRCode}>
            <div className={styles.receiptCode}>
              Код получения <b>12367</b>
            </div>
            <img className={styles.qrCodeImg} src={srcQRCode} alt="QR код" />
            <Button wide onClick={handleScanQRCodeClick}>
              Сканировать QR
            </Button>
          </aside>
        )}
      </div>

      <div className={styles.bikeBottom}>
        <h4 className={styles.mapTitle}>Пункт проката</h4>
        <div className={styles.mapContainer}>
          <MainYMap zoom={15} pointRent={mapData} typeMarker="MarkerRentPoint" />
        </div>
      </div>
    </Modal>
  );
};
