'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Range } from 'react-date-range';
import { useMutation } from '@tanstack/react-query';

import { useLoginModal } from '@/hooks/useModal';

import { categories } from '@/components/navbar/Categories';
import ListingHead from '@/components/listings/ListingHead';
import ListingInfo from '@/components/listings/ListingInfo';
import ListingReservation from '@/components/listings/ListingReservation';
import {
  SafeUser,
  Listing,
  ReservationWithListing,
} from '@/generated/api/api-service';
import getCurrentUser from '@/actions/getCurrentUser';

import styles from './ListingClient.module.css';

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection',
};

interface ListingClientProps {
  reservations?: ReservationWithListing[];
  listing: Listing & {
    user: SafeUser;
  };
}

const ListingClient: React.FC<ListingClientProps> = ({
  reservations = [],
  listing,
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const currentUser = getCurrentUser();

  const { mutate } = useMutation({
    mutationFn: async (data: any) => axios.post('/api/reservations', data),
    onSuccess: () => {
      toast.success('Reservation success');
      setDateRange(initialDateRange);
      router.push('/trips');
    },
    onError: () => toast.error('Something went wrong'),
    onMutate: () => setIsLoading(true),
    onSettled: () => setIsLoading(false),
  });

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    const data = {
      totalPrice,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      listingId: listing?.id,
    };
    mutate(data);
  }, [totalPrice, dateRange, listing?.id, currentUser, loginModal, mutate]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );
      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);

  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category);
  }, [listing.category]);

  return (
    <div className={styles.container}>
      <ListingHead
        title={listing.title}
        imageSrc={listing.imageSrc ?? ''}
        // locationValue={listing.locationValue}
        // id={listing.id}
        // currentUser={currentUser}
      />
      <div className={styles.info}>
        <ListingInfo
          user={listing.user}
          category={category}
          description={listing.description}
          roomCount={listing.roomCount}
          guestCount={listing.guestCount}
          bathroomCount={listing.bathroomCount}
        />
        <div className={styles.reservation}>
          <ListingReservation
            price={listing.price}
            totalPrice={totalPrice}
            onChangeDate={(value) => setDateRange(value)}
            dateRange={dateRange}
            onSubmit={onCreateReservation}
            disabled={isLoading}
            disabledDates={disabledDates}
          />
        </div>
      </div>
    </div>
  );
};

export default ListingClient;
