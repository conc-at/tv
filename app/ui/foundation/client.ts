import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'https://localhost:500/graphql',
});

export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  link,
});
