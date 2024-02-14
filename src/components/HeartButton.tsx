'use client';

import styles from './HeartButton.module.css';

import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

import useFavorite from '../hooks/useFavorite';
import { SafeUser } from '@/generated/api/api-service';

interface HeartButtonProps {
  listingId: string;
  currentUser?: SafeUser | null;
}

const HeartButton: React.FC<HeartButtonProps> = ({
  listingId,
  currentUser,
}) => {
  const { hasFavorited, toggleFavorite } = useFavorite({
    listingId,
    currentUser,
  });

  return (
    <div onClick={toggleFavorite} className={styles.container}>
      <AiOutlineHeart size={28} className={styles.outlineHeart} />
      <AiFillHeart
        size={24}
        style={{
          fill: hasFavorited ? 'rgb(244 63 94)' : 'rgb(115 115 115 / 0.7)',
        }}
      />
    </div>
  );
};

export default HeartButton;
