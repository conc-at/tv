# frozen_string_literal: true

module Mutations
  class MoveChannelInPlaylist < BaseMutation
    field :playlist, Types::PlaylistType, null: true
    field :errors, [String], null: false

    argument :playlist_id, ID, required: true
    argument :from, ID, required: true
    argument :to, ID, required: true
    argument :before, Boolean, required: false

    def resolve(playlist_id:, from:, to:, before: false)
      result = ::MoveChannelInPlaylist.(
        playlist_id: playlist_id,
        from: from, to: to, before: before
      )

      return { errors: [result.error] } if result.failure?

      {
        playlist: Playlist.find(playlist_id),
        errors: [],
      }
    end
  end
end
