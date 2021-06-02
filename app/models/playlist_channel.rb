# frozen_string_literal: true

class PlaylistChannel < ApplicationRecord
  include ManualSort

  self.table_name = 'playlist_channels'

  belongs_to :playlist
  belongs_to :channel
end
