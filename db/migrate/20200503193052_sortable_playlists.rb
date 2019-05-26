# frozen_string_literal: true

class SortablePlaylists < ActiveRecord::Migration[6.0]
  def change
    add_column(:playlists, :position, :rationale)
  end
end
