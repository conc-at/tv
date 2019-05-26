# frozen_string_literal: true

class ExtractPlaylist
  include Interactor

  def call
    res = Typhoeus.get(context.url)
    raise 'cannot fetch M3U playlist' unless res.success?

    Rm3u::Playlist.parse(res.body)
  rescue StandardError => e
    context.fail!(error: e.message)
  end
end
