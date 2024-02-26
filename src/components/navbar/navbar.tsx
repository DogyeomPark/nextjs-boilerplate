import Logo from './logo';

import styles from './navbar.module.css';

const Navbar: React.FC = () => {
  return (
    <div className={styles.navBar}>
      <div className={styles.borderBelow}>
        <div className={styles.container}>
          <Logo />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
