import * as Types from '../../../types';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type PlaylistsQueryQueryVariables = {
  first?: Types.Maybe<Types.Scalars['Int']>;
  last?: Types.Maybe<Types.Scalars['Int']>;
  after?: Types.Maybe<Types.Scalars['String']>;
  before?: Types.Maybe<Types.Scalars['String']>;
};


export type PlaylistsQueryQuery = (
  { __typename?: 'Query' }
  & { playlists?: Types.Maybe<(
    { __typename?: 'PlaylistConnection' }
    & { edges?: Types.Maybe<Array<Types.Maybe<(
      { __typename?: 'PlaylistEdge' }
      & Pick<Types.PlaylistEdge, 'cursor'>
      & { node?: Types.Maybe<(
        { __typename?: 'Playlist' }
        & Pick<Types.Playlist, 'id' | 'name'>
      )> }
    )>>>, pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<Types.PageInfo, 'endCursor' | 'startCursor' | 'hasNextPage' | 'hasPreviousPage'>
    ) }
  )> }
);


export const PlaylistsQueryDocument = gql`
    query PlaylistsQuery($first: Int, $last: Int, $after: String, $before: String) {
  playlists(first: $first, last: $last, after: $after, before: $before) {
    edges {
      node {
        id
        name
      }
      cursor
    }
    pageInfo {
      endCursor
      startCursor
      hasNextPage
      hasPreviousPage
    }
  }
}
    `;

/**
 * __usePlaylistsQueryQuery__
 *
 * To run a query within a React component, call `usePlaylistsQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlaylistsQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlaylistsQueryQuery({
 *   variables: {
 *      first: // value for 'first'
 *      last: // value for 'last'
 *      after: // value for 'after'
 *      before: // value for 'before'
 *   },
 * });
 */
export function usePlaylistsQueryQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PlaylistsQueryQuery, PlaylistsQueryQueryVariables>) {
        return ApolloReactHooks.useQuery<PlaylistsQueryQuery, PlaylistsQueryQueryVariables>(PlaylistsQueryDocument, baseOptions);
      }
export function usePlaylistsQueryLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PlaylistsQueryQuery, PlaylistsQueryQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<PlaylistsQueryQuery, PlaylistsQueryQueryVariables>(PlaylistsQueryDocument, baseOptions);
        }
export type PlaylistsQueryQueryHookResult = ReturnType<typeof usePlaylistsQueryQuery>;
export type PlaylistsQueryLazyQueryHookResult = ReturnType<typeof usePlaylistsQueryLazyQuery>;
export type PlaylistsQueryQueryResult = ApolloReactCommon.QueryResult<PlaylistsQueryQuery, PlaylistsQueryQueryVariables>;