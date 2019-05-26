# frozen_string_literal: true

class RenamePlaylistsChannelsToPlaylistChannels < ActiveRecord::Migration[6.0]
  def change
    rename_table(:playlists_channels, :playlist_channels)
  end
end
