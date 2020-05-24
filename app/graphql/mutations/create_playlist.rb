# frozen_string_literal: true

module Mutations
  class CreatePlaylist < BaseMutation
    argument :name, String, required: true

    field :playlist, Types::PlaylistType, null: true
    field :errors, [String], null: false

    def resolve(name:)
      result = ::CreatePlaylist.(name: name, user: context[:current_user])
      return { errors: [result.error] } if result.failure?

      {
        playlist: result.playlist,
        errors: [],
      }
    end
  end
end
