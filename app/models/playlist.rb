# frozen_string_literal: true

class Playlist < ApplicationRecord
  include ManualSort

  has_many :playlist_channels
  has_many(
    :channels,
    lambda {
      table_name = PlaylistChannel.table_name
      order(
        Arel.sql(
          "((#{table_name}.position).p::float8 / (#{table_name}.position).q) asc"
        )
      )
    },
    through: :playlist_channels
  )
  belongs_to :user
end
