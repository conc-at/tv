# frozen_string_literal: true

module Types
  class PlaylistType < Types::BaseObject
    field :id, ID, null: false
    field :name, ID, null: false
    field :channels, Types::ChannelType.connection_type, null: true

    def channels
      object.channels.ordered
    end
  end
end
