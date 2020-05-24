# frozen_string_literal: true

class RemoveChannelFromPlaylist
  include Interactor

  def call
    context.playlist = Playlist.find(context.playlist_id)
    context.channel = Channel.find(context.channel_id)

    context.playlist.channels.destroy(context.channel)

    notify_client
  end

  private

  def notify_client
    ConcatTvSchema.subscriptions.trigger(
      'channelRemovedFromPlaylist',
      {},
      {
        operation_type: 'REMOVED',
        channel: context.channel,
        playlist: context.playlist,
      }
    )
  end
end
