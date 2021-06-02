# frozen_string_literal: true

module Types
  class ChannelType < Types::BaseObject
    field :id, type: ID, null: false
    field :name, String, null: false

    def name
      object.data
    end

    field :path, String, null: false
    field :state, Types::ChannelStateType, null: false
  end
end
