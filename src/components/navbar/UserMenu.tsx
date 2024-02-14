'use client';

import styles from './UserMenu.module.css';

// modules
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

// icons
import { AiOutlineMenu } from 'react-icons/ai';

// components
import MenuItem from './MenuItem';
import LanguageSelector from './LanguageSelector';

import {
  useRegisterModal,
  useLoginModal,
  useRentModal,
} from '@/hooks/useModal';

import { signOut, useSession } from 'next-auth/react';

const UserMenu: React.FC = () => {
  const { data: session, status } = useSession();
  const currentUser = session?.user ?? null;
  const { t } = useTranslation();

  //
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal]);

  return (
    <div className={styles.rootContainer}>
      <div className={styles.airbnbContainer}>
        <div onClick={onRent} className={styles.airbnbLabel}>
          {t('navbarAirbnb')}
        </div>
        <button onClick={toggleOpen} className={styles.airbnbButton}>
          <AiOutlineMenu />
        </button>
        {/* <div className='hidden md:block'>
          <Avatar src={currentUser?.image} />
        </div> */}
        <LanguageSelector />
      </div>
      {isOpen && (
        <div className={styles.menuContainer}>
          <div className={styles.menu}>
            {currentUser ? (
              <>
                <Link href='/trips'>
                  <MenuItem label='My trips' />
                </Link>
                <Link href='/favorites'>
                  <MenuItem label='My favorites' />
                </Link>
                <Link href='/reservations'>
                  <MenuItem label='My reservations' />
                </Link>
                <Link href='/properties'>
                  <MenuItem label='My properties' />
                </Link>
                <MenuItem
                  onClick={() => {
                    setIsOpen(false);
                    rentModal.onOpen();
                  }}
                  label='Airbnb my home'
                />
                <hr />
                <MenuItem
                  onClick={() => {
                    setIsOpen(false);
                    signOut();
                  }}
                  label='Logout'
                />
              </>
            ) : (
              <>
                <MenuItem
                  onClick={() => {
                    setIsOpen(false);
                    loginModal.onOpen();
                  }}
                  label='Login'
                />
                <MenuItem
                  onClick={() => {
                    setIsOpen(false);
                    registerModal.onOpen();
                  }}
                  label='Sign up'
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
