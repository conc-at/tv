# frozen_string_literal: true

class RenamePlaylistMetaToPlaylist < ActiveRecord::Migration[6.0]
  def change
    rename_table(:playlist_meta, :playlists)
  end
end
