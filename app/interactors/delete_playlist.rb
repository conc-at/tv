# frozen_string_literal: true

class DeletePlaylist
  include Interactor

  def call
    playlist = Playlist.find(context.id)
    playlist.destroy!

    notify_client
  rescue StandardError => e
    context.fail!(error: e.message)
  end

  private

  def notify_client
    ConcatTvSchema
      .subscriptions
      .trigger(
        'playlistDeleted', {},
        []
      )
  end
end
