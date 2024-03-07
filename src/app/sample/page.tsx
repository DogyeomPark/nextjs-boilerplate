import { use } from 'react';

import EmptyState from '@/components/emptyState';
import Heading from '@/components/heading';
import ClientComponent from './clientComponent';

import { auth } from '@/auth';

const SamplePage: React.FC = () => {
  const session = use(auth());

  if (!session?.user) {
    return <EmptyState title="No user found" subtitle="No user found" />;
  }

  return (
    <div>
      <Heading title="User found" subtitle="User found" />
      <ClientComponent />
    </div>
  );
};

export default SamplePage;
