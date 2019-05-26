# frozen_string_literal: true

class CreateUser < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :name, null: false
    end

    add_index(:users, :name, unique: true)
  end
end
