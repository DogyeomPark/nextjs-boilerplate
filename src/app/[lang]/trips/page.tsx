import EmptyState from '@/components/EmptyState';

import getCurrentUser from '@/actions/getCurrentUser';
import Container from '@/components/Container';
import Heading from '@/components/Heading';
import { apiService } from '@/lib/apiService';
import TripsClient from './TripsClient';

const TripsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title='Unauthorized' subtitle='Please login.' />;
  }

  const reservations = await apiService.reservation
    .reservationControllerSearchReservation({
      userId: currentUser.id,
    })
    .then((res) => res.data);

  if (reservations.length === 0) {
    return (
      <EmptyState
        title='No trips found.'
        subtitle="Looks like you haven't reserved any trips."
      />
    );
  }

  return (
    <Container>
      <Heading
        title='Trips'
        subtitle="Where you'be been and where you're heading"
      />
      <TripsClient reservations={reservations} />
    </Container>
  );
};

export default TripsPage;
