import { use } from 'react';

import Container from '@/components/Container';
import ListingCard from '@/components/listings/ListingCard';
import EmptyState from '@/components/EmptyState';

import { Listing } from '@/generated/api/api-service';

import initTranslations from '@/app/i18n';

import styles from './page.module.css';

interface PageProps {
  params: {
    lang: 'en' | 'ko';
  };
}

export const dynamic = 'force-dynamic';

const Home: React.FC<PageProps> = ({ params }) => {
  // server component 에서는 직접적인 호출
  // const list = await apiService.listing
  //   .listingControllerSearchListing({})
  //   .then((res) => res.data);

  const { lang } = params;
  const { t } = use(initTranslations(lang, ['common']));

  const list: any[] = [];

  if (!list || list.length === 0) {
    return (
      <EmptyState
        showReset
        title={t('noMatchTitle')}
        subtitle={t('noMatchSubtitle')}
        lang={lang}
      />
    );
  }

  return (
    <Container>
      <div className={styles.container}>
        {list.map((item: Listing) => {
          return <ListingCard key={item.id} data={item} />;
        })}
      </div>
    </Container>
  );
};

export default Home;
