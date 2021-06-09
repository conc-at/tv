import * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type FetchPlaylistsQueryVariables = Types.Exact<{
  first?: Types.Maybe<Types.Scalars['Int']>;
  last?: Types.Maybe<Types.Scalars['Int']>;
  before?: Types.Maybe<Types.Scalars['String']>;
  after?: Types.Maybe<Types.Scalars['String']>;
}>;


export type FetchPlaylistsQuery = (
  { __typename?: 'Query' }
  & { playlists?: Types.Maybe<(
    { __typename?: 'PlaylistConnection' }
    & { pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<Types.PageInfo, 'hasNextPage' | 'hasPreviousPage' | 'endCursor' | 'startCursor'>
    ), edges?: Types.Maybe<Array<Types.Maybe<(
      { __typename?: 'PlaylistEdge' }
      & Pick<Types.PlaylistEdge, 'cursor'>
      & { node?: Types.Maybe<(
        { __typename?: 'Playlist' }
        & Pick<Types.Playlist, 'id' | 'name'>
      )> }
    )>>> }
  )> }
);


export const FetchPlaylistsDocument = gql`
    query FetchPlaylists($first: Int, $last: Int, $before: String, $after: String) {
  playlists(first: $first, last: $last, before: $before, after: $after) {
    pageInfo {
      hasNextPage
      hasPreviousPage
      endCursor
      startCursor
    }
    edges {
      cursor
      node {
        id
        name
      }
    }
  }
}
    `;

/**
 * __useFetchPlaylistsQuery__
 *
 * To run a query within a React component, call `useFetchPlaylistsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchPlaylistsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchPlaylistsQuery({
 *   variables: {
 *      first: // value for 'first'
 *      last: // value for 'last'
 *      before: // value for 'before'
 *      after: // value for 'after'
 *   },
 * });
 */
export function useFetchPlaylistsQuery(baseOptions?: Apollo.QueryHookOptions<FetchPlaylistsQuery, FetchPlaylistsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchPlaylistsQuery, FetchPlaylistsQueryVariables>(FetchPlaylistsDocument, options);
      }
export function useFetchPlaylistsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchPlaylistsQuery, FetchPlaylistsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchPlaylistsQuery, FetchPlaylistsQueryVariables>(FetchPlaylistsDocument, options);
        }
export type FetchPlaylistsQueryHookResult = ReturnType<typeof useFetchPlaylistsQuery>;
export type FetchPlaylistsLazyQueryHookResult = ReturnType<typeof useFetchPlaylistsLazyQuery>;
export type FetchPlaylistsQueryResult = Apollo.QueryResult<FetchPlaylistsQuery, FetchPlaylistsQueryVariables>;