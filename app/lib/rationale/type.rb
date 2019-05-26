# frozen_string_literal: true

module Rationale
  class Type < ActiveRecord::Type::Value
    def cast(value)
      return value if value.nil?

      value.tr('()', '').tr(',', '/').to_r
    end

    def serialize(value)
      value.to_s
    end
  end
end
