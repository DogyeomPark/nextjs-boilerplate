import styles from './Navbar.module.css';

import Container from '../Container';
import Logo from './Logo';
import Search from './Search';
import UserMenu from './UserMenu';
import Categories from './Categories';

const Navbar: React.FC = () => {
  return (
    <div className={styles.navBar}>
      <div className={styles.borderBelow}>
        <Container>
          <div className={styles.container}>
            <Logo />
            <Search />
            <UserMenu />
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  );
};

export default Navbar;
