'use client';

import styles from './RentModal.module.css';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { z } from 'zod';

import { useRentModal } from '@/hooks/useModal';

import Heading from '@/components/Heading';
import Counter from '@/components/inputs/Counter';
import CategoryInput from '@/components/inputs/CategoryInput';
import ImageUpload from '@/components/inputs/ImageUpload';
import Input from '@/components/inputs/Input';
import { categories } from '@/components/navbar/Categories';
import Modal from '@/components/modals/Modal';
import { CreateListingSchema } from '@/schemas/listing';

enum STEPS {
  CATEGORY = 0,
  INFO = 1,
  IMAGES = 2,
  DESCRIPTION = 3,
  PRICE = 4,
}

const RentModal = () => {
  const rentModal = useRentModal();
  const router = useRouter();

  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof CreateListingSchema>>({
    defaultValues: {
      category: '',
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      price: 1,
      title: '',
      description: '',
    },
  });

  const category = watch('category');
  const guestCount = watch('guestCount');
  const roomCount = watch('roomCount');
  const bathroomCount = watch('bathroomCount');
  const imageSrc = watch('imageSrc');
  const price = watch('price');
  const description = watch('description');

  const setCustomValue = (
    id:
      | 'title'
      | 'description'
      | 'imageSrc'
      | 'category'
      | 'roomCount'
      | 'bathroomCount'
      | 'guestCount'
      | 'price',
    value: any
  ) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit: SubmitHandler<z.infer<typeof CreateListingSchema>> = async (
    data
  ) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }

    await fetch('/api/listing', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        setIsLoading(false);
        return res;
      })
      .then((res) => {
        if (!res.ok) {
          res.json().then((data) => {
            toast.error(data.errors[0].message);
          });
          throw new Error('o shit');
        }
        return res.json();
      })
      .then((data) => {
        toast.success('Listing Created!');
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        rentModal.onClose();
      })
      .catch((e) => console.error(e));

    // mutate(data);
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      <Counter
        title='Guests'
        subtitle='How many guests do you allow?'
        value={guestCount}
        onChange={(value) => setCustomValue('guestCount', value)}
      />;
      return 'Create';
    }
    return 'Next';
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    return 'Back';
  }, [step]);

  let bodyContent = (
    <>
      <Heading
        title='Which of these best describes your place?'
        subtitle='Pick a category'
      />
      <div className={styles.body}>
        {categories.map((item) => (
          <div key={item.label}>
            <CategoryInput
              onClick={(label) => {
                setCustomValue('category', label);
              }}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </>
  );

  if (step === STEPS.INFO) {
    bodyContent = (
      <>
        <Heading
          title='Share some basics about your place'
          subtitle='What amenities do you have?'
        />
        <Counter
          title='Guests'
          subtitle='How many guests do you allow?'
          value={guestCount}
          onChange={(value) => setCustomValue('guestCount', value)}
        />
        <hr />
        <Counter
          title='Rooms'
          subtitle='How many rooms do you have?'
          value={roomCount}
          onChange={(value) => setCustomValue('roomCount', value)}
        />
        <hr />
        <Counter
          title='Bathrooms'
          subtitle='How many bathrooms do you allow?'
          value={bathroomCount}
          onChange={(value) => setCustomValue('bathroomCount', value)}
        />
      </>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <>
        <Heading
          title='Add a photo of you place'
          subtitle='Show guests what your place looks like!'
        />
        <ImageUpload
          value={imageSrc}
          onChange={(value) => setCustomValue('imageSrc', value)}
        />
      </>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <>
        <Heading
          title='How would you describe your place?'
          subtitle='Short and sweet works best!'
        />
        <Input
          id='title'
          label='Title'
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id='description'
          label='Description'
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <>
        <Heading
          title='Now, set your price'
          subtitle='How much do you charge per night?'
        />
        <Input
          id='price'
          label='Price'
          formatPrice
          type='number'
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </>
    );
  }

  return (
    <Modal
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      title='Airbnb your home!'
      body={bodyContent}
    />
  );
};

export default RentModal;
