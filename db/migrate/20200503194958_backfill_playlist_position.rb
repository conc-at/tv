# frozen_string_literal: true

class BackfillPlaylistPosition < ActiveRecord::Migration[6.0]
  def up
    Playlist.order(id: :asc).each do |playlist|
      playlist.move(nil)
    end
  end

  def down
    Playlist.update_all('position = null')
  end
end
