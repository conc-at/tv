# frozen_string_literal: true

user = User.find_or_create_by!(name: 'Daniela')

(1..10).each do |index|
  Playlist.find_or_create_by!(name: "Playlist #{index}", user: user)
end
