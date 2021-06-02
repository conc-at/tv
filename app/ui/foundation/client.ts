import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const cache = new InMemoryCache();

const link = new HttpLink({
    uri: '/graphql'
});

export const client = new ApolloClient({
    cache,
    link
});