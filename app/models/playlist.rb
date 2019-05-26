# frozen_string_literal: true

class Playlist < ApplicationRecord
  scope :ordered, lambda { |direction = :asc|
    dir = direction == :asc ? 'ASC' : 'DESC'
    order(
      Arel.sql("((position).p::float8 / (position).q) #{dir}")
    )
  }

  after_create :reload_after_position_change

  has_many :playlist_channels
  has_many :channels, through: :playlist_channels

  attribute :position, ::Rationale::Type.new

  def move(rel_id, before: false)
    ApplicationRecord.connection.exec_query(
      'SELECT playlists_sbt_move_row($1, $2, $3::boolean)',
      'SQL',
      [[nil, id], [nil, rel_id], [nil, before]],
      prepare: true
    )
    reload_after_position_change
    self
  end

  def move_to_start
    first = Playlist.ordered.limit(1).first
    move(first.id, before: true)
    reload_after_position_change
    self
  end

  def move_to_end
    last = Playlist.ordered(:desc).limit(1).first
    move(last.id)
    reload_after_position_change
    self
  end

  private

  def reload_after_position_change
    reload
  end
end
