import * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type AllPlaylistsQueryVariables = Types.Exact<{
  first?: Types.Maybe<Types.Scalars['Int']>;
  last?: Types.Maybe<Types.Scalars['Int']>;
  after?: Types.Maybe<Types.Scalars['String']>;
  before?: Types.Maybe<Types.Scalars['String']>;
}>;


export type AllPlaylistsQuery = (
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
      & Pick<Types.PageInfo, 'hasNextPage' | 'hasPreviousPage' | 'startCursor' | 'endCursor'>
    ) }
  )> }
);


export const AllPlaylistsDocument = gql`
    query AllPlaylists($first: Int, $last: Int, $after: String, $before: String) {
  playlists(first: $first, last: $last, after: $after, before: $before) {
    edges {
      cursor
      node {
        id
        name
      }
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
  }
}
    `;

/**
 * __useAllPlaylistsQuery__
 *
 * To run a query within a React component, call `useAllPlaylistsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllPlaylistsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllPlaylistsQuery({
 *   variables: {
 *      first: // value for 'first'
 *      last: // value for 'last'
 *      after: // value for 'after'
 *      before: // value for 'before'
 *   },
 * });
 */
export function useAllPlaylistsQuery(baseOptions?: Apollo.QueryHookOptions<AllPlaylistsQuery, AllPlaylistsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllPlaylistsQuery, AllPlaylistsQueryVariables>(AllPlaylistsDocument, options);
      }
export function useAllPlaylistsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllPlaylistsQuery, AllPlaylistsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllPlaylistsQuery, AllPlaylistsQueryVariables>(AllPlaylistsDocument, options);
        }
export type AllPlaylistsQueryHookResult = ReturnType<typeof useAllPlaylistsQuery>;
export type AllPlaylistsLazyQueryHookResult = ReturnType<typeof useAllPlaylistsLazyQuery>;
export type AllPlaylistsQueryResult = Apollo.QueryResult<AllPlaylistsQuery, AllPlaylistsQueryVariables>;