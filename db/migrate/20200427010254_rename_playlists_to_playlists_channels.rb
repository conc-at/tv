# frozen_string_literal: true

class RenamePlaylistsToPlaylistsChannels < ActiveRecord::Migration[6.0]
  def change
    rename_table(:playlists, :playlists_channels)
  end
end
