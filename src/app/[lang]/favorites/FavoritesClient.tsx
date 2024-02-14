import { Listing, SafeUser } from '@/generated/api/api-service';
import ListingCard from '../../../components/listings/ListingCard';

import styles from './FavoritesClient.module.css';

interface FavoritesClientProps {
  listings: Listing[];
}

const FavoritesClient: React.FC<FavoritesClientProps> = ({ listings }) => {
  return (
    <div className={styles.cardContainer}>
      {listings.map((listing) => (
        <ListingCard key={listing.id} data={listing} />
      ))}
    </div>
  );
};

export default FavoritesClient;
