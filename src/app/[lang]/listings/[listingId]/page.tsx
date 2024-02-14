import { apiService } from '@/lib/apiService';

import EmptyState from '@/components/EmptyState';
import Container from '@/components/Container';
import ListingClient from './ListingClient';

import styles from './page.module.css';

//
const ListingPage = async ({ params }: { params: any }) => {
  // dynamic rotue 의 경우 params 를 사용하여 route 에서 지정한 변수명을 읽어옵니다.
  // client component 에서응 useParams 를 사용할 수 있습니다.
  const { listingId } = params;

  //
  const listing = await apiService.listing
    .listingControllerGetListing(listingId as string)
    .then((res) => res.data);
  const reservations = await apiService.reservation
    .reservationControllerSearchReservation({
      listingId: listingId as string,
    })
    .then((res) => res.data);

  //
  if (!listing) {
    return <EmptyState />;
  }
  return (
    <Container>
      <div className={styles.listingContainer}>
        <ListingClient listing={listing} reservations={reservations} />
      </div>
    </Container>
  );
};

export default ListingPage;
