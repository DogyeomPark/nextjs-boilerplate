import { IconType } from 'react-icons';

import styles from './ListingCategory.module.css';

interface ListingCategoryProps {
  icon: IconType;
  label: string;
  description: string;
}

const ListingCategory: React.FC<ListingCategoryProps> = ({
  icon: Icon,
  label,
  description,
}) => {
  return (
    <div className={styles.container}>
      <Icon size={40} className={styles.icon} />
      <div className={styles.infoContainer}>
        <div className={styles.label}>{label}</div>
        <div className={styles.description}>{description}</div>
      </div>
    </div>
  );
};

export default ListingCategory;
