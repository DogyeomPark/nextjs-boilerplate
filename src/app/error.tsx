'use client';

import { useEffect } from 'react';
import EmptyState from '../components/emptyState';

interface ErrorStateProps {
  error: Error;
  reset: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error, reset }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <EmptyState title="Uh oh!" subtitle="Something went wrong" />;
};

export default ErrorState;
