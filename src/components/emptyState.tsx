import Heading from './heading';
import Button from './button';
import Link from 'next/link';

import styles from './emptyState.module.css';

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No exact matches',
  subtitle = 'Try changing or removing some  of your filters',
  showReset,
}) => {
  return (
    <div className={styles.container}>
      <Heading center title={title} subtitle={subtitle} />
      <div className={styles.cardContainer}>
        {showReset && (
          <Link href="/">
            <Button outline label="return" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
