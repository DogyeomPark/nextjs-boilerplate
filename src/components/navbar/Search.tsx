'use client';

import styles from './Search.module.css';

import { useSearchParams } from 'next/navigation';
import { BiSearch } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';

// hooks
import { useSearchModal } from '@/hooks/useModal';

import { useMemo } from 'react';
import { differenceInDays } from 'date-fns';

const Search = () => {
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const { t } = useTranslation();

  const startDate = params?.get('startDate');
  const endDate = params?.get('endDate');
  const guestCount = params?.get('guestCount');

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      let diff = differenceInDays(end, start);

      if (diff === 0) {
        diff = 1;
      }

      return t('searchBarTime', { diff });
    }

    return t('searchBarTimeDefault');
  }, [startDate, endDate]);

  const guestLabel = useMemo(() => {
    if (guestCount) {
      return t('searchBarGuest', { guestCount });
    }
    return t('searchBarGuestDefault');
  }, [guestCount]);

  return (
    <div onClick={searchModal.onOpen} className={styles.search}>
      <div className={styles.searchContainer}>
        <div className={styles.labelDuration}>{durationLabel}</div>
        <div className={styles.labelGuestContainer}>
          <div className={styles.labelGuest}>{guestLabel}</div>
          <div className={styles.iconContainer}>
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
