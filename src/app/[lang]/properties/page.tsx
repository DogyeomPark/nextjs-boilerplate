import getCurrentUser from '@/actions/getCurrentUser';

import EmptyState from '@/components/EmptyState';
import Container from '@/components/Container';
import Heading from '@/components/Heading';
import PropertiesClient from './PropertiesClient';
import { apiService } from '@/lib/apiService';

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title='Unauthorized' subtitle='Please login.' />;
  }

  //
  const list = await apiService.listing
    .listingControllerSearchListing({
      userId: currentUser.id,
    })
    .then((res) => res.data);
  if (list.length === 0) {
    return (
      <EmptyState
        title='No properties found.'
        subtitle='Looks like you have no properties.'
      />
    );
  }

  return (
    <Container>
      <Heading title='Properties' subtitle='List of your properties' />
      <PropertiesClient listings={list} />
    </Container>
  );
};

export default PropertiesPage;
