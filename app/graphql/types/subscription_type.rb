# frozen_string_literal: true

module Types
  class SubscriptionType < BaseObject
    extend GraphQL::Subscriptions::SubscriptionRoot

    field :channel_added, ChannelType, null: true,
          description: 'A channel was added.'

    field :channel_moved, ChannelMoveType, null: false,
          description: 'One ore more channels have changed their position.'

    field :playlist_created, PlaylistType, null: false,
          description: 'A new playlist has been created.'

    field :playlist_deleted, [String], null: true,
          description: 'A playlist has been deleted.'

    field :playlist_moved, PlaylistMoveType, null: false,
          description: 'One or more playlists have changed their position.'

    field :playlist_updated, PlaylistType, null: false,
          description: 'A playlist has been updated.'

    field :user_online, UserType, null: false,
          description: 'A user appeared online.'

    field :user_offline, UserType, null: false,
          description: 'A user went offline.'
  end
end
