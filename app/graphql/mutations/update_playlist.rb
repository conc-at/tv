# frozen_string_literal: true

module Mutations
  class UpdatePlaylist < BaseMutation
    argument :id, ID, required: true
    argument :playlist, Types::PlaylistAttributesType, required: true

    field :playlist, Types::PlaylistType, null: true
    field :errors, [String], null: false

    def resolve(id:, playlist:)
      result = ::UpdatePlaylist.(id: id, attributes: playlist)
      return { errors: [result.error] } if result.failure?

      { playlist: result.playlist, errors: [] }
    end
  end
end
