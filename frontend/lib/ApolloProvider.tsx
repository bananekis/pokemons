'use client';

import { ApolloLink, HttpLink } from '@apollo/client';
import {
  ApolloNextAppProvider,
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr';
import { uri } from '@/config';

const makeClient = () => {
  const httpLink = new HttpLink({
    uri,
  });

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window === 'undefined'
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            httpLink,
          ])
        : httpLink,
  });
};

const ApolloProvider = ({ children }: React.PropsWithChildren) => (
  <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>
);

export default ApolloProvider;
