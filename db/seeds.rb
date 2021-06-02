# frozen_string_literal: true

# user = User.create!(name: "anonymous")
# playlist = Playlist.create!(name: "Your playlist", user: user)

user = User.create!(name: 'Natasha')

(1..100).each do |index|
  Playlist.create!(name: "Playlist #{index}", user: user)
end
