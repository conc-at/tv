# frozen_string_literal: true

class MoveChannelInPlaylist
  include Interactor

  def call
    context.playlist = PlaylistChannel.find_by(playlist_id: context.playlist_id)
    context.playlist.move(context.from, context.to, before: context.before)

    notify_client
  end

  private

  def notify_client
    ConcatTvSchema.subscriptions.trigger(
      'channelMovedInPlaylist',
      {},
      {
        operation_type: 'MOVED',
        channel: nil,
        playlist: context.playlist,
      }
    )
  end
end
