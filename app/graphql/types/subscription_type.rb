# frozen_string_literal: true

module Types
  class SubscriptionType < BaseObject
    field :channel_added, ChannelType, null: true,
          description: 'A channel was added.'

    field :channel_moved, ChannelMoveType, null: true,
          description: 'A channel has changed position.'

    field :channel_added_to_playlist, ChannelMoveType, null: true,
          description: 'A channel was added to a playlist.'

    field :channel_removed_from_playlist, ChannelMoveType, null: true,
          description: 'A channel was removed from a playlist.'

    field :channel_moved_in_playlist, ChannelMoveType, null: true,
          description: 'A channel has changed position in a playlist.'

    field :playlist_created, PlaylistType, null: true,
          description: 'A new playlist has been created.'

    field :playlist_deleted, [String], null: true,
          description: 'A playlist has been deleted.'

    field :playlist_moved, PlaylistMoveType, null: true,
          description: 'A playlist has changed position.'

    field :playlist_updated, PlaylistType, null: true,
          description: 'A playlist has been updated.'

    field :user_online, UserType, null: true,
          description: 'A user appeared online.'

    field :user_offline, UserType, null: true,
          description: 'A user went offline.'
  end
end
