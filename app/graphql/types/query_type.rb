# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject
    field :channels, Types::ChannelType.connection_type, null: false, description: 'List of available channels'

    def channels
      Channel.ordered
    end

    field :playlists, Types::PlaylistType.connection_type, null: true, description: 'List of available playlists'

    def playlists
      Playlist.ordered
    end

    field :playlist, Types::PlaylistType, null: true do
      argument :id, ID, required: true
    end

    def playlist(id:)
      Playlist.find(id)
    end

    field :users_online, [Types::UserType], null: true

    def users_online
      appearances.list
    end

    private

    def appearances
      @appearances ||= Appearance::Store.new(name: 'appearances')
    end
  end
end
