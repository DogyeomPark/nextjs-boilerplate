'use client';

import { signIn } from 'next-auth/react';
import { useCallback, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { z } from 'zod';


import { useRegisterModal, useLoginModal } from '@/hooks/useModal';

import Modal from './Modal';
import Heading from '../Heading';
import { SigninSchema } from '../../schemas/account';

function LoginModal() {
  const router = useRouter();

  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register, // not for register account but for "register object"
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof SigninSchema>>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof SigninSchema>> = (data) => {
    setIsLoading(true);
    signIn('keycloak');
  };

  const toggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <>
      <Heading title='Welcome back' subtitle='Login to your account!' />
    </>
  );

  const footerContent = (
    <>
      <hr />
      <div className='modal-footer-text-container'>
        <span>First time using Airbnb?</span>
        <span onClick={toggle} className='modal-footer-text'>
          Create an account
        </span>
      </div>
    </>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title='Login'
      actionLabel='Continue'
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default LoginModal;
