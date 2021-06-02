import * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type PlaylistFieldsFragment = (
  { __typename?: 'Playlist' }
  & Pick<Types.Playlist, 'id' | 'name'>
);

export type PlaylistsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type PlaylistsQuery = (
  { __typename?: 'Query' }
  & { playlists?: Types.Maybe<(
    { __typename?: 'PlaylistConnection' }
    & { edges?: Types.Maybe<Array<Types.Maybe<(
      { __typename?: 'PlaylistEdge' }
      & { node?: Types.Maybe<(
        { __typename?: 'Playlist' }
        & { channels?: Types.Maybe<(
          { __typename?: 'ChannelConnection' }
          & { edges?: Types.Maybe<Array<Types.Maybe<(
            { __typename?: 'ChannelEdge' }
            & { node?: Types.Maybe<(
              { __typename?: 'Channel' }
              & Pick<Types.Channel, 'id'>
            )> }
          )>>> }
        )> }
        & PlaylistFieldsFragment
      )> }
    )>>> }
  )> }
);

export const PlaylistFieldsFragmentDoc = gql`
    fragment PlaylistFields on Playlist {
  id
  name
}
    `;
export const PlaylistsDocument = gql`
    query Playlists {
  playlists {
    edges {
      node {
        ...PlaylistFields
        channels {
          edges {
            node {
              id
            }
          }
        }
      }
    }
  }
}
    ${PlaylistFieldsFragmentDoc}`;

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