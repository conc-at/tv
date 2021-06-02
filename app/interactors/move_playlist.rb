# frozen_string_literal: true

class MovePlaylist
  include Interactor

  def call
    playlist = Playlist.find(context.from_id)
    playlist.move(context.to_id, before: context.before)

    notify_client
  rescue StandardError => e
    context.fail!(error: e.message)
  end

  private

  def notify_client
    ConcatTvSchema
      .subscriptions
      .trigger(
        'playlistMoved', {},
        {
          from_id: context.from_id,
          to_id: context.to_id,
          before: context.before,
        }
      )
  end
end
