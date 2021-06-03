import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const cache = new InMemoryCache();



const link = new HttpLink({
  uri: 'http://localhost:5000/graphql',
});

export const client = new ApolloClient({ cache, link });