# frozen_string_literal: true

user = User.create!(name: 'Daniela')
# user = User.find_by(name: "Daniela")

(1..10).each do |index|
  Playlist.create!(name: "Playlist #{index}", user: user)
end