# frozen_string_literal: true

module Types
  class ChannelOperationType < Types::BaseEnum
    value 'ADDED', 'A channel was added.'
    value 'MOVED', 'A channel was moved.'
    value 'REMOVED', 'A channel was removed.'
  end
end
