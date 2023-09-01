import React from 'react';
import { Modal } from '../Modal';
import { MainYMap } from '../../components/MainYMap/MainYMap';
import { RentPoint } from 'src/api/Api.types';
import styles from './MapModal.module.css';

interface Props {
  points: RentPoint[];
  onClose: () => void;
}

export const MapModal = ({ onClose, points }: Props) => {
  return (
    <Modal width={1032} title={'Пункты проката'} onClose={onClose}>
      <div className={styles.mapContainer}>
        <MainYMap points={points} />
      </div>
    </Modal>
  );
};
