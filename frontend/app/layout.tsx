import './globals.scss';
import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import ApolloProvider from '@/lib/ApolloProvider';

const RootLayout = ({ children }: { children: ReactNode }) => (
  <html lang="en">
    <body>
      <ApolloProvider>
        <Toaster />
        <div className="container">
          <div className="content">{children}</div>
        </div>
      </ApolloProvider>
    </body>
  </html>
);

export default RootLayout;
