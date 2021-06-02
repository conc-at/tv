# frozen_string_literal: true

class CascadeDeleteUpdate < ActiveRecord::Migration[6.0]
  def change
    add_foreign_key :playlist_channels, :playlists, on_delete: :cascade
    add_foreign_key :playlist_channels, :channels, on_delete: :cascade
  end
end
