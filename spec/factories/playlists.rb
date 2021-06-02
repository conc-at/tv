# frozen_string_literal: true

FactoryBot.define do
  factory :playlist do
    name { Faker::Internet.name }
  end
end
