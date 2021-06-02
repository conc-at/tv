# frozen_string_literal: true

user = User.create!(name: 'Hannes')

(1..100).each do |index|
  Playlist.create!(name: "Playlist #{index}", user: user)
end

