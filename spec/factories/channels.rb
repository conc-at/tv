# frozen_string_literal: true

FactoryBot.define do
  factory :channel do
    data { '' }
    path { Faker::Internet.url }
  end
end
