import * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type PlaylistsQueryVariables = Types.Exact<{
  n?: Types.Maybe<Types.Scalars['Int']>;
  after?: Types.Maybe<Types.Scalars['String']>;
  before?: Types.Maybe<Types.Scalars['String']>;
}>;


export type PlaylistsQuery = (
  { __typename?: 'Query' }
  & { playlists?: Types.Maybe<(
    { __typename?: 'PlaylistConnection' }
    & { pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<Types.PageInfo, 'hasNextPage' | 'hasPreviousPage' | 'startCursor' | 'endCursor'>
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


export const PlaylistsDocument = gql`
    query Playlists($n: Int, $after: String, $before: String) {
  playlists(first: $n, after: $after, before: $before) {
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
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
 * __usePlaylistsQuery__
 *
 * To run a query within a React component, call `usePlaylistsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlaylistsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlaylistsQuery({
 *   variables: {
 *      n: // value for 'n'
 *      after: // value for 'after'
 *      before: // value for 'before'
 *   },
 * });
 */
export function usePlaylistsQuery(baseOptions?: Apollo.QueryHookOptions<PlaylistsQuery, PlaylistsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PlaylistsQuery, PlaylistsQueryVariables>(PlaylistsDocument, options);
      }
export function usePlaylistsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PlaylistsQuery, PlaylistsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PlaylistsQuery, PlaylistsQueryVariables>(PlaylistsDocument, options);
        }
export type PlaylistsQueryHookResult = ReturnType<typeof usePlaylistsQuery>;
export type PlaylistsLazyQueryHookResult = ReturnType<typeof usePlaylistsLazyQuery>;
export type PlaylistsQueryResult = Apollo.QueryResult<PlaylistsQuery, PlaylistsQueryVariables>;