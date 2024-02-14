'use client';

import { Range } from 'react-date-range';

import Button from '../Button';
import Calendar from '../inputs/Calendar';

import styles from './ListingReservation.module.css';

interface ListingReservationProps {
  price: number;
  dateRange: Range;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[];
}

const ListingReservation: React.FC<ListingReservationProps> = ({
  price,
  dateRange,
  totalPrice,
  onChangeDate,
  onSubmit,
  disabled,
  disabledDates,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.price}>$ {price}</div>
        <div className={styles.night}>night</div>
      </div>
      <hr />
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />
      <hr />
      <div className={styles.reserveBtn}>
        <Button disabled={disabled} label='Reserve' onClick={onSubmit} />
      </div>
      <div className={styles.description}>
        <div>Total</div>
        <div>$ {totalPrice}</div>
      </div>
    </div>
  );
};

export default ListingReservation;
