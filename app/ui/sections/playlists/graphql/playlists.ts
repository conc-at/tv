import * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {};
export type PlaylistsQueryVariables = Types.Exact<{
  first?: Types.Maybe<Types.Scalars['Int']>;
  last?: Types.Maybe<Types.Scalars['Int']>;
  before?: Types.Maybe<Types.Scalars['String']>;
  after?: Types.Maybe<Types.Scalars['String']>;
}>;

export type PlaylistsQuery = { __typename?: 'Query' } & {
  playlists?: Types.Maybe<
    { __typename?: 'PlaylistConnection' } & {
      edges?: Types.Maybe<
        Array<
          Types.Maybe<
            { __typename?: 'PlaylistEdge' } & {
              node?: Types.Maybe<
                { __typename?: 'Playlist' } & Pick<
                  Types.Playlist,
                  'id' | 'name'
                >
              >;
            }
          >
        >
      >;
      pageInfo: { __typename?: 'PageInfo' } & Pick<
        Types.PageInfo,
        'endCursor' | 'startCursor' | 'hasNextPage' | 'hasPreviousPage'
      >;
    }
  >;
};

export const PlaylistsDocument = gql`
  query playlists($first: Int, $last: Int, $before: String, $after: String) {
    playlists(first: $first, last: $last, before: $before, after: $after) {
      edges {
        node {
          id
          name
        }
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
 *      first: // value for 'first'
 *      last: // value for 'last'
 *      before: // value for 'before'
 *      after: // value for 'after'
 *   },
 * });
 */
export function usePlaylistsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    PlaylistsQuery,
    PlaylistsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PlaylistsQuery, PlaylistsQueryVariables>(
    PlaylistsDocument,
    options,
  );
}
export function usePlaylistsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PlaylistsQuery,
    PlaylistsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PlaylistsQuery, PlaylistsQueryVariables>(
    PlaylistsDocument,
    options,
  );
}
export type PlaylistsQueryHookResult = ReturnType<typeof usePlaylistsQuery>;
export type PlaylistsLazyQueryHookResult = ReturnType<
  typeof usePlaylistsLazyQuery
>;
export type PlaylistsQueryResult = Apollo.QueryResult<
  PlaylistsQuery,
  PlaylistsQueryVariables
>;
