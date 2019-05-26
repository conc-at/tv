# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
    field :move_channel, mutation: Mutations::MoveChannel

    field :create_playlist, mutation: Mutations::CreatePlaylist
    field :delete_playlist, mutation: Mutations::DeletePlaylist
    field :move_playlist, mutation: Mutations::MovePlaylist
    field :update_playlist, mutation: Mutations::UpdatePlaylist
  end
end
