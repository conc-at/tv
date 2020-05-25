# frozen_string_literal: true

user = User.create!(name: "anonymous")
playlist = Playlist.create!(name: "Your playlist", user: user)
