'use client';

import { useEffect } from 'react';

interface ErrorStateProps {
  error: Error;
  reset: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error, reset }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <div>Error</div>;
};

export default ErrorState;
