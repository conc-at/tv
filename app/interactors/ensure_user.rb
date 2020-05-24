# frozen_string_literal: true

class EnsureUser
  include Interactor

  def call
    context.user = User.find_or_create_by!(name: context.name)
  end
end
