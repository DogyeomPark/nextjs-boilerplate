'use client';

import { IconType } from 'react-icons';

import Avatar from '../Avatar';
import ListingCategory from './ListingCategory';
import { SafeUser } from '@/generated/api/api-service';

import styles from './ListingInfo.module.css';

interface ListingInfoProps {
  user?: SafeUser | null;
  category:
    | {
        label: string;
        icon: IconType;
        description: string;
      }
    | undefined;
  description: string;
  roomCount: number;
  guestCount: number;
  bathroomCount: number;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  category,
  description,
  roomCount,
  bathroomCount,
  guestCount,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.userInfo}>
          <div>Hosted by {user?.name}</div>
          <Avatar src={user?.image} />
        </div>
        <div className={styles.countInfo}>
          <div>{guestCount} guests</div>
          <div>{roomCount} rooms</div>
          <div>{bathroomCount} bathrooms</div>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}
      <hr />
      <div className={styles.description}>{description}</div>
      <hr />
    </div>
  );
};

export default ListingInfo;
