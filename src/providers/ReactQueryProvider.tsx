'use client';

import { ReactNode, useState } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental';

interface ReactQueryProviderProps {
  children: ReactNode;
}

const ReactQueryProvider: React.FC<ReactQueryProviderProps> = ({
  children,
}) => {
  const [client] = useState(new QueryClient());

  return (
    <QueryClientProvider client={client}>
      {/* ReactQueryStreamedHydration 컴포넌트는 서버로부터 클라이언트로 데이터가 스트리밍될 수 있도록 하는 역할을 합니다. */}
      <ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;
