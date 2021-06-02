# frozen_string_literal: true

class RenamePlaylistMetaId < ActiveRecord::Migration[6.0]
  def change
    rename_column(:playlists, :playlist_id, :playlist_meta_id)
  end
end
