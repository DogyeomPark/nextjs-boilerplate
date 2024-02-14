import styles from './Logo.module.css';

import Image from 'next/image';
import Link from 'next/link';

const Logo: React.FC = () => {
  return (
    <Link href='/'>
      <Image
        alt='Logo'
        className={styles.image}
        height='40'
        width='120'
        src='/images/logo.png'
      />
    </Link>
  );
};

export default Logo;
