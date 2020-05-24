# frozen_string_literal: true

module ManualSort
  extend ActiveSupport::Concern

  included do
    attribute :position, ::Rationale::Type.new

    scope :ordered, lambda { |direction = :asc|
      dir = direction == :asc ? 'ASC' : 'DESC'
      order(
        Arel.sql("((#{table_name}.position).p::float8 / (#{table_name}.position).q) #{dir}")
      )
    }

    after_create :reload_after_position_change
  end

  def move(rel_id, before: false)
    ApplicationRecord.connection.exec_query(
      "SELECT #{self.class.table_name}_sbt_move_row($1, $2, $3::boolean)",
      'SQL',
      [[nil, id], [nil, rel_id], [nil, before]],
      prepare: true
    )
    reload_after_position_change
    self
  end

  def move_to_start
    first = ordered.limit(1).first
    move(first.id, before: true)
    reload_after_position_change
    self
  end

  def move_to_end
    last = ordered(:desc).limit(1).first
    move(last.id)
    reload_after_position_change
    self
  end

  private

  def reload_after_position_change
    reload
  end
end
