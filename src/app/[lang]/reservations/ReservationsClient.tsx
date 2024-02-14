'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

import ListingCard from '../../../components/listings/ListingCard';
import { ReservationWithListing } from '@/generated/api/api-service';

import styles from './ReservationsClient.module.css';

interface ReservationsClientProps {
  reservations?: ReservationWithListing[];
}

const ReservationsClient: React.FC<ReservationsClientProps> = ({
  reservations,
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
    onError: (err: any) => toast.error('Something went wrong'),
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
          actionLabel='Cancel guest reservation'
        />
      ))}
    </div>
  );
};

export default ReservationsClient;
