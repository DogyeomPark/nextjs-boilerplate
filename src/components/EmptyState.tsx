import { use } from 'react';

import initTranslations from '@/app/i18n';
import Heading from './Heading';
import Button from './Button';
import Link from 'next/link';

import styles from './EmptyState.module.css';

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
  lang?: 'en' | 'ko';
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No exact matches',
  subtitle = 'Try changing or removing some  of your filters',
  showReset,
  lang = 'en',
}) => {
  const { t } = use(initTranslations(lang, ['common']));

  return (
    <div className={styles.container}>
      <Heading center title={title} subtitle={subtitle} />
      <div className={styles.cardContainer}>
        {showReset && (
          <Link href='/'>
            <Button outline label={t('emptyStateBtn')} />
          </Link>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
