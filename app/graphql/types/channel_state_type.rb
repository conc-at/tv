# frozen_string_literal: true

module Types
  class ChannelStateType < Types::BaseEnum
    value 'ONLINE', value: 'online'
    value 'OFFLINE', value: 'offline'
  end
end
