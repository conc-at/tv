import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { relayStylePagination } from '@apollo/client/utilities';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        playlists: {
          ...relayStylePagination(),
          // keyArgs: false,
        },
      },
    },
  },
});

export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  uri: '/graphql',
});