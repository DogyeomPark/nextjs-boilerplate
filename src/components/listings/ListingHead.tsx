'use client';

import Heading from '../Heading';
import Image from 'next/image';
import HeartButton from '../HeartButton';
import { SafeUser } from '@/generated/api/api-service';

import styles from './ListingHead.module.css';

interface ListingHeadProps {
  title: string;
  imageSrc: string;
  // id: string;
  // currentUser?: SafeUser | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  // id,
  imageSrc,
  // currentUser,
}) => {
  return (
    <>
      <Heading title={title} />
      <div className={styles.container}>
        <Image alt='Image' src={imageSrc} fill className={styles.image} />
        {/* <div className='absolute top-5 right-5'>
          <HeartButton listingId={id} currentUser={currentUser} />
        </div> */}
      </div>
    </>
  );
};

export default ListingHead;
