# frozen_string_literal: true

class Channel < ApplicationRecord
  enum state: {
    online: 'online',
    offline: 'offline',
  }

  scope :ordered, lambda { |direction = :asc|
    dir = direction == :asc ? 'ASC' : 'DESC'
    order(
      Arel.sql("((position).p::float8 / (position).q) #{dir}")
    )
  }

  after_create :reload_after_position_change

  has_many :playlists_channels
  has_many :playlists, through: :playlists_channels

  attribute :position, ::Rationale::Type.new

  def move(rel_id, before: false)
    ApplicationRecord.connection.exec_query(
      'SELECT channels_sbt_move_row($1, $2, $3::boolean)',
      'SQL',
      [[nil, id], [nil, rel_id], [nil, before]],
      prepare: true
    )
    reload_after_position_change
    self
  end

  def move_to_start
    first = Channel.ordered.limit(1).first
    move(first.id, before: true)
    reload_after_position_change
    self
  end

  def move_to_end
    last = Channel.ordered(:desc).limit(1).first
    move(last.id)
    reload_after_position_change
    self
  end

  private

  def reload_after_position_change
    reload
  end
end
