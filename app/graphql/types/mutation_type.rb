# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
    field :move_channel_in_playlist, mutation: Mutations::MoveChannelInPlaylist
    field :remove_channel_from_playlist, mutation: Mutations::RemoveChannelFromPlaylist
    field :add_channel_to_playlist, mutation: Mutations::AddChannelToPlaylist
    field :move_channel, mutation: Mutations::MoveChannel

    field :create_playlist, mutation: Mutations::CreatePlaylist
    field :delete_playlist, mutation: Mutations::DeletePlaylist
    field :move_playlist, mutation: Mutations::MovePlaylist
    field :update_playlist, mutation: Mutations::UpdatePlaylist
  end
end
