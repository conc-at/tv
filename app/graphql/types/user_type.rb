# frozen_string_literal: true

module Types
  class UserType < Types::BaseObject
    field :name, ID, null: false
  end
end
