# frozen_string_literal: true

class UpdatePlaylist
  include Interactor

  def call
    playlist = Playlist.find(context.id)
    playlist.update!(context.attributes.to_h)

    context.playlist = playlist

    notify_client
  rescue StandardError => e
    context.fail!(error: e.message)
  end

  private

  def notify_client
    ConcatTvSchema
      .subscriptions
      .trigger(
        'playlistUpdated', {},
        context.playlist
      )
  end
end
