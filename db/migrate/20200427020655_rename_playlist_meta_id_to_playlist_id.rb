# frozen_string_literal: true

class RenamePlaylistMetaIdToPlaylistId < ActiveRecord::Migration[6.0]
  def change
    rename_column(:playlist_channels, :playlist_meta_id, :playlist_id)
  end
end
