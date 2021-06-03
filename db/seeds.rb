# frozen_string_literal: true

# user = User.create!(name: "anonymous")
user4 = User.create!(name: "hubertus")

# Playlist.create!(name: "Your playlist", user: user2)

#
(1..20).each do |index|
  Playlist.create!(name: "Super playlis #{index}", user: user4)
end
#
# (1..20).each do |index|
#   Playlist.create!(name: "hans playlist #{index}", user: user2)
# end
