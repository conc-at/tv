# frozen_string_literal: true

module Appearance
  class Store
    attr_reader :name

    APPEARANCES = 'appearances'
    private_constant :APPEARANCES

    def initialize(name:)
      @name = name
    end

    def add(value)
      key = normalized_key(value)

      redis.hincrby(key, APPEARANCES, 1)
      redis.hset(key, 'name', value)
      redis.sadd(APPEARANCES, key)
    end

    def delete(value)
      key = normalized_key(value)

      count = redis.hincrby(normalized_key(value), APPEARANCES, -1)

      return if count.positive?

      redis.del(key)
      redis.srem(APPEARANCES, key)
    end

    def has(value)
      key = normalized_key(value)

      redis.sismember(APPEARANCES, key)
    end

    def list
      keys = redis.sort(APPEARANCES, { by: 'nosort' })

      keys.map do |key|
        redis.hgetall(key)
      end
    end

    private

    def normalized_key(value)
      "#{name.parameterize}:#{value.parameterize}"
    end

    def redis
      @redis ||= Redis.new(Rails.application.config_for(:redis))
    end
  end
end
