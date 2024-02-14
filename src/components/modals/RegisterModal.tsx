'use client';

import { signIn } from 'next-auth/react';
import { useCallback, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { z } from 'zod';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';

import { useRegisterModal, useLoginModal } from '@/hooks/useModal';

import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import Button from '../Button';

import { SignupSchema } from '@/schemas/account';

import styles from './RegisterModal.module.css';

function RegisterModal() {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof SignupSchema>>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof SignupSchema>> = async (
    data
  ) => {
    await fetch('/api/register', {
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
        toast.success('Register success');
        registerModal.onClose();
        loginModal.onOpen();

        // doSomething(data);
      })
      .catch((e) => console.error(e));
  };

  const toggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <>
      <Heading title='Welcome to Airbnb' subtitle='Create an account' />
      <Input
        id='name'
        label='Name'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id='email'
        label='Email'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id='password'
        type='password'
        label='password'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </>
  );

  const footerContent = (
    <>
      <hr />
      <Button
        outline
        label='Continue with Google'
        icon={FcGoogle}
        onClick={() => {
          signIn('google');
        }}
      />
      <Button
        outline
        label='Continue with Github'
        icon={AiFillGithub}
        onClick={() => {
          signIn('github');
        }}
      />
      <div className={styles.footerContainer}>
        <div className='modal-footer-text-container '>
          <span>Already have an account?</span>
          <span onClick={toggle} className='modal-footer-text'>
            Log in
          </span>
        </div>
      </div>
    </>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title='Register'
      actionLabel='Continue'
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default RegisterModal;
