'use client';

import { useRouter } from 'next/navigation';
import { useState, useCallback } from 'react';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

import { toast } from 'react-hot-toast';
import ListingCard from '../../../components/listings/ListingCard';
import { Listing } from '@/generated/api/api-service';

import styles from './PropertiesClient.module.css';

interface PropertiesClientProps {
  listings: Listing[];
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({ listings }) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const { mutate } = useMutation({
    mutationFn: async (id: string) => await axios.delete(`/api/listings/${id}`),
    onSuccess: () => {
      toast.success('Listing deleted');
      router.refresh();
    },
    onError: (err: any) => toast.error(err?.response?.data?.error),
    onMutate: (id) => setDeletingId(id),
    onSettled: () => setDeletingId(''),
  });

  const onCancel = useCallback((id: string) => mutate(id), [mutate]);

  return (
    <div className={styles.cardContainer}>
      {listings.map((listing) => (
        <ListingCard
          key={listing.id}
          data={listing}
          actionId={listing.id}
          onAction={onCancel}
          disabled={deletingId === listing.id}
          actionLabel='Delete property'
        />
      ))}
    </div>
  );
};

export default PropertiesClient;
