import EmptyState from '@/components/EmptyState';
import Container from '@/components/Container';
import Heading from '@/components/Heading';
import ListingCard from '@/components/listings/ListingCard';
import { ListingWithUser } from '@/generated/api/api-service';

import styles from './FavoritesClient.module.css';

export default function Page() {
  const listings: ListingWithUser[] = [];
  if (listings.length === 0) {
    return (
      <EmptyState
        title='No favorites found'
        subtitle='Looks like you have no favorite listing'
      />
    );
  }

  return (
    <Container>
      <Heading
        title='Favorites'
        subtitle='List of places you have favorited!'
      />
      <div className={styles.cardContainer}>
        {listings.map((listing) => (
          <ListingCard key={listing.id} data={listing} />
        ))}
      </div>
    </Container>
  );
}
