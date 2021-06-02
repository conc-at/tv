# frozen_string_literal: true

module Types
  class PlaylistAttributesType < Types::BaseInputObject
    description 'Attributes for creating or updating a playlist.'
    argument :name, String, 'Name of playlist', required: true
  end
end
