'use client';

// modules
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState, useCallback } from 'react';
import { Range } from 'react-date-range';
import qs from 'query-string';
import { formatISO } from 'date-fns';
import { useTranslation } from 'react-i18next';

// components
import Modal from './Modal';
import Heading from '../Heading';

// hooks
import { useSearchModal } from '@/hooks/useModal';

import Calendar from '../inputs/Calendar';
import Counter from '../inputs/Counter';

enum STEPS {
  DATE = 0,
  INFO = 1,
}

const SearchModal = () => {
  const searchModal = useSearchModal();
  const router = useRouter();
  const params = useSearchParams();
  const { t } = useTranslation(['common', 'modal']);

  const [step, setStep] = useState(STEPS.DATE);
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [BathroomCount, setBathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) {
      return onNext();
    }

    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      guestCount,
      roomCount,
      BathroomCount,
    };

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }

    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = qs.stringifyUrl(
      {
        url: '/',
        query: updatedQuery,
      },
      { skipNull: true }
    );

    setStep(STEPS.DATE);
    searchModal.onClose();

    router.push(url);
  }, [
    BathroomCount,
    dateRange.endDate,
    dateRange.startDate,
    guestCount,
    onNext,
    params,
    roomCount,
    router,
    searchModal,
    step,
  ]);

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return t('search');
    }
    return t('next');
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.DATE) {
      return undefined;
    }
    return t('back');
  }, [step]);

  let bodyContent = (
    <>
      <Heading
        title={t('searchTitleTime', { ns: 'modal' })}
        subtitle={t('searchSubtitleTime', { ns: 'modal' })}
      />
      <Calendar
        value={dateRange}
        onChange={(value) => {
          setDateRange(value.selection);
        }}
      />
    </>
  );

  if (step == STEPS.INFO) {
    bodyContent = (
      <>
        <Heading
          title={t('searchTitleGuest', { ns: 'modal' })}
          subtitle={t('searchSubtitleGuest', { ns: 'modal' })}
        />
        <Counter
          title={t('searchInfoTitleGuest', { ns: 'modal' })}
          subtitle={t('searchInfoSubtitleGuest', { ns: 'modal' })}
          value={guestCount}
          onChange={(value) => {
            setGuestCount(value);
          }}
        />
        <Counter
          title={t('searchInfoTitleRoom', { ns: 'modal' })}
          subtitle={t('searchInfoSubtitleRoom', { ns: 'modal' })}
          value={roomCount}
          onChange={(value) => {
            setRoomCount(value);
          }}
        />
        <Counter
          title={t('searchInfoTitleBathrooms', { ns: 'modal' })}
          subtitle={t('searchInfoSubtitleBathrooms', { ns: 'modal' })}
          value={BathroomCount}
          onChange={(value) => {
            setBathroomCount(value);
          }}
        />
      </>
    );
  }

  return (
    <Modal
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
      title='Filters'
      actionLabel={actionLabel}
      secondaryAction={step === STEPS.DATE ? undefined : onBack}
      secondaryActionLabel={secondaryActionLabel}
      body={bodyContent}
    />
  );
};

export default SearchModal;
