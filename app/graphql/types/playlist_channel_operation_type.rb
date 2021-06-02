# frozen_string_literal: true

module Types
  class PlaylistChannelOperationType < Types::BaseObject
    field :operation_type, Types::ChannelOperationType, null: false
    field :channel, ChannelType, null: true
    field :playlist, PlaylistType, null: true
  end
end
