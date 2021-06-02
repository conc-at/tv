# frozen_string_literal: true

class AddSbtToPlaylists < ActiveRecord::Migration[6.0]
  def up
    sbt = File.read(Rails.root / 'db' / 'postgres' / 'stern-brocot.up.sql.erb')

    ext = Db::Extension.new(sbt)
    ext.table_name = 'playlists'
    ext.id_col = 'id'
    ext.pos_col = 'position'

    execute(ext.render)
  end
end
