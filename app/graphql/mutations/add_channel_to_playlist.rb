# frozen_string_literal: true

module Mutations
  class AddChannelToPlaylist < BaseMutation
    field :playlist, Types::PlaylistType, null: true
    field :errors, [String], null: false

    argument :channel_id, ID, required: true
    argument :playlist_id, ID, required: true

    def resolve(channel_id:, playlist_id:)
      result = ::AddChannelToPlaylist.(
        channel_id: channel_id,
        playlist_id: playlist_id
      )

      return { errors: [result.error] } if result.failure?

      {
        playlist: Playlist.find(playlist_id),
        errors: [],
      }
    end
  end
end
