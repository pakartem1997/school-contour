import React, { useEffect, useState } from 'react';
import { api } from '../../api/Api';
import { PointTabs } from '../../components/PointTabs/PointTabs';
import { Bike, Pagination, RentPoint } from '../../api/Api.types';
import { Paging } from '../../components/Paging/Paging';
import { useSearchParams } from 'react-router-dom';
import { Card } from '../../components/Card/Card';
import styles from './Catalog.module.css';
import { BikeModal } from '../../components/BikeModal/BikeModal';
import { getDeclensionWord, bikeDeclension } from '../../helpers/getDeclensionWord';
import { Loader } from '../../components/Loader/Loader';
import { MapModal } from '../../components/MapModal/MapModal';
import MapIcon from '../../img/map.svg';

const pageQueryName = 'page';
const pointIdQueryName = 'pointId';

function findDeliveryPoint(bikeId: string, points: RentPoint[]) {
  for (const item of points) {
    if (item.bikesList.includes(bikeId)) {
      return { address: item.address, coordinates: item.coordinates };
    }
  }
  return { address: '', coordinates: [0, 0] };
}

export interface bikeModalData {
  title: string;
  bikeId: string;
  cost: number;
  mapData: {
    address: string;
    coordinates: number[];
  };
  bikeIsRented: boolean;
}

const bikeModalDataDefault = {
  title: '',
  bikeId: '',
  cost: 0,
  mapData: {
    address: '',
    coordinates: [0, 0],
  },
  bikeIsRented: false,
};

const pageDataDefault = {
  itemsInPage: [],
  hasMore: false,
  pages: 1,
  totalItems: 0,
};

export const Catalog: React.FC = () => {
  const [displayModalBike, setDisplayModalBike] = useState(false);
  const [displayModalMap, setDisplayModalMap] = useState(false);
  const [points, setPoints] = useState<RentPoint[]>([]);
  const [searchParams, updateSearchParams] = useSearchParams();
  const [bikeModalData, setBikeModalData] = useState<bikeModalData>(bikeModalDataDefault);
  const [pageData, setPageData] = useState<Pagination<Bike>>(pageDataDefault);
  const [loading, setLoading] = useState(true);

  const currentPage = (() => {
    const candidate = searchParams.get(pageQueryName);
    return candidate ? Number(candidate) : 1;
  })();

  const currentPointId = (() => {
    const candidate = searchParams.get(pointIdQueryName);
    return candidate ? candidate : '';
  })();

  useEffect(() => {
    (async () => {
      setLoading(true);
      setPoints(await api.point.getPoints());
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const pageListBike = await api.catalog.getBikes(currentPage, currentPointId);
      setPageData(pageListBike);

      if (pageListBike.itemsInPage.length === 0) {
        searchParams.set(pageQueryName, '1');
        updateSearchParams(searchParams);
      }
    })();
  }, [currentPage, currentPointId, bikeModalData.bikeIsRented]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className={styles.catalogHeader}>
        <PointTabs points={points} />
        <aside className={styles.catalogHeaderAside}>
          <span className={styles.onMap} onClick={() => setDisplayModalMap(true)}>
            <MapIcon className={styles.mapIcon} />
            На карте
          </span>
          <span className={styles.headerText} id="bikes-count">
            {`${pageData.totalItems} ${getDeclensionWord(pageData.totalItems, bikeDeclension)}`}
          </span>
        </aside>
      </div>

      <section className="catalog">
        {pageData.itemsInPage.map((bike) => (
          <Card
            key={bike._id}
            bike={bike}
            onClick={() => {
              setDisplayModalBike(true);
              setBikeModalData({
                title: bike.name,
                bikeId: bike._id,
                cost: bike.cost,
                mapData: findDeliveryPoint(bike._id, points),
                bikeIsRented: false,
              });
            }}
            rentButtonEnable
          />
        ))}
      </section>

      <Paging totalPages={pageData.pages} />

      {displayModalBike && (
        <BikeModal
          onClose={() => {
            setDisplayModalBike(false);
          }}
          bike={bikeModalData}
          mapData={bikeModalData.mapData}
        />
      )}

      {displayModalMap && <MapModal points={points} onClose={() => setDisplayModalMap(false)} />}
    </>
  );
};
