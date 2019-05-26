export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Channel = {
   __typename?: 'Channel';
  id: Scalars['ID'];
  name: Scalars['String'];
  path: Scalars['String'];
  state: ChannelState;
};

export type ChannelConnection = {
   __typename?: 'ChannelConnection';
  edges?: Maybe<Array<Maybe<ChannelEdge>>>;
  nodes?: Maybe<Array<Maybe<Channel>>>;
  pageInfo: PageInfo;
};

export type ChannelEdge = {
   __typename?: 'ChannelEdge';
  cursor: Scalars['String'];
  node?: Maybe<Channel>;
};

export type ChannelMove = {
   __typename?: 'ChannelMove';
  before: Scalars['Boolean'];
  fromId: Scalars['ID'];
  toId?: Maybe<Scalars['ID']>;
};

export enum ChannelState {
  Online = 'ONLINE',
  Offline = 'OFFLINE'
}

export type CreatePlaylistPayload = {
   __typename?: 'CreatePlaylistPayload';
  errors: Array<Scalars['String']>;
  playlist?: Maybe<Playlist>;
};

export type DeletePlaylistPayload = {
   __typename?: 'DeletePlaylistPayload';
  errors: Array<Scalars['String']>;
};

export type MoveChannelPayload = {
   __typename?: 'MoveChannelPayload';
  errors: Array<Scalars['String']>;
};

export type MovePlaylistPayload = {
   __typename?: 'MovePlaylistPayload';
  errors: Array<Scalars['String']>;
};

export type Mutation = {
   __typename?: 'Mutation';
  createPlaylist?: Maybe<CreatePlaylistPayload>;
  deletePlaylist?: Maybe<DeletePlaylistPayload>;
  moveChannel?: Maybe<MoveChannelPayload>;
  movePlaylist?: Maybe<MovePlaylistPayload>;
  updatePlaylist?: Maybe<UpdatePlaylistPayload>;
};


export type MutationCreatePlaylistArgs = {
  name: Scalars['String'];
};


export type MutationDeletePlaylistArgs = {
  id: Scalars['ID'];
};


export type MutationMoveChannelArgs = {
  fromId: Scalars['ID'];
  toId?: Maybe<Scalars['ID']>;
  before?: Maybe<Scalars['Boolean']>;
};


export type MutationMovePlaylistArgs = {
  fromId: Scalars['ID'];
  toId?: Maybe<Scalars['ID']>;
  before?: Maybe<Scalars['Boolean']>;
};


export type MutationUpdatePlaylistArgs = {
  id: Scalars['ID'];
  playlist: PlaylistAttributes;
};

export type PageInfo = {
   __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type Playlist = {
   __typename?: 'Playlist';
  channels?: Maybe<ChannelConnection>;
  id: Scalars['ID'];
  name: Scalars['ID'];
};


export type PlaylistChannelsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type PlaylistAttributes = {
  name: Scalars['String'];
};

export type PlaylistConnection = {
   __typename?: 'PlaylistConnection';
  edges?: Maybe<Array<Maybe<PlaylistEdge>>>;
  nodes?: Maybe<Array<Maybe<Playlist>>>;
  pageInfo: PageInfo;
};

export type PlaylistEdge = {
   __typename?: 'PlaylistEdge';
  cursor: Scalars['String'];
  node?: Maybe<Playlist>;
};

export type PlaylistMove = {
   __typename?: 'PlaylistMove';
  before: Scalars['Boolean'];
  fromId: Scalars['ID'];
  toId?: Maybe<Scalars['ID']>;
};

export type Query = {
   __typename?: 'Query';
  channels: ChannelConnection;
  playlist?: Maybe<Playlist>;
  playlists?: Maybe<PlaylistConnection>;
  usersOnline?: Maybe<Array<User>>;
};


export type QueryChannelsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryPlaylistArgs = {
  id: Scalars['ID'];
};


export type QueryPlaylistsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type Subscription = {
   __typename?: 'Subscription';
  channelAdded?: Maybe<Channel>;
  channelMoved: ChannelMove;
  playlistCreated: Playlist;
  playlistDeleted?: Maybe<Array<Scalars['String']>>;
  playlistMoved: PlaylistMove;
  playlistUpdated: Playlist;
  userOffline: User;
  userOnline: User;
};

export type UpdatePlaylistPayload = {
   __typename?: 'UpdatePlaylistPayload';
  errors: Array<Scalars['String']>;
  playlist?: Maybe<Playlist>;
};

export type User = {
   __typename?: 'User';
  name: Scalars['ID'];
};
