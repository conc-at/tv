# frozen_string_literal: true

module Mutations
  class MoveChannel < BaseMutation
    argument :from_id, ID, required: true
    argument :to_id, ID, required: false
    argument :before, Boolean, required: false

    field :errors, [String], null: false

    def resolve(from_id:, to_id: null, before: false)
      result = ::MoveChannel.(from_id: from_id, to_id: to_id, before: before)
      return { errors: [result.error] } if result.failure?

      { errors: [] }
    end
  end
end
