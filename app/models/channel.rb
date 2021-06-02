# frozen_string_literal: true

class Channel < ApplicationRecord
  include ManualSort

  enum state: {
    online: 'online',
    offline: 'offline',
  }

  has_many :playlists_channels
  has_many :playlists, through: :playlists_channels
end
