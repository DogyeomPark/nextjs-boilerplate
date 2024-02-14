'use client';

import { useRouter } from 'next/navigation';
import { useState, useCallback } from 'react';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

import { toast } from 'react-hot-toast';
import ListingCard from '../../../components/listings/ListingCard';
import { ReservationWithListing } from '@/generated/api/api-service';

import styles from './TripsClient.module.css';

const TripsClient: React.FC<{ reservations?: ReservationWithListing[] }> = ({
  reservations,
}: {
  reservations?: ReservationWithListing[];
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const { mutate } = useMutation({
    mutationFn: async (id: string) =>
      await axios.delete(`/api/reservations/${id}`),
    onSuccess: () => {
      toast.success('Reservation canceled');
      router.refresh();
    },
    onError: () => toast.error('Something went wrong'),
    onMutate: (id) => setDeletingId(id),
    onSettled: () => setDeletingId(''),
  });

  const onCancel = useCallback((id: string) => mutate(id), [mutate]);

  return (
    <div className={styles.cardContainer}>
      {reservations?.map((reservation) => (
        <ListingCard
          key={reservation.id}
          data={reservation.listing}
          reservation={reservation}
          actionId={reservation.id}
          onAction={onCancel}
          disabled={deletingId === reservation.id}
          actionLabel='Cancel reservation'
        />
      ))}
    </div>
  );
};

export default TripsClient;
