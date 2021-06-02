# frozen_string_literal: true

module Mutations
  class DeletePlaylist < BaseMutation
    argument :id, ID, required: true

    field :errors, [String], null: false

    def resolve(id:)
      result = ::DeletePlaylist.(id: id)
      return { errors: [result.error] } if result.failure?

      { errors: [] }
    end
  end
end
