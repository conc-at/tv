# frozen_string_literal: true

user = User.create!(name: "anonymous")
(1..100).each do |index|
  Playlist.create!(name: "Playlist #{index}", user: user)
end
