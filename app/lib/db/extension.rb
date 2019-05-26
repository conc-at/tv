# frozen_string_literal: true

module Db
  class Extension
    attr_accessor :table_name, :id_col, :pos_col

    def initialize(template)
      @renderer = ERB.new(template)
    end

    def render
      @renderer.result(binding)
    end
  end
end
