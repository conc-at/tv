# frozen_string_literal: true

class AddUniqueIndexForPlaylistPosition < ActiveRecord::Migration[6.0]
  def change
    add_index(:playlists, :position, unique: true)
  end
end
