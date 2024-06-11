import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { SessionProvider } from 'next-auth/react';
import Layout from '@/components/Layout';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: '/api/graphql'
});

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
    <ApolloProvider client={client}>
      <SessionProvider session={session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </ApolloProvider>
  )
}

export default App
