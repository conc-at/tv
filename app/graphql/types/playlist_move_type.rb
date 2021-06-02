# frozen_string_literal: true

module Types
  class PlaylistMoveType < Types::BaseObject
    field :from_id, ID, null: false
    field :to_id, ID, null: true
    field :before, Boolean, null: false
  end
end
