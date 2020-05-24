# frozen_string_literal: true

class AddChannelToPlaylist
  include Interactor

  def call
    context.playlist = Playlist.find(context.playlist_id)
    context.channel = Channel.find(context.channel_id)

    context.playlist.channels << context.channel

    notify_client
  end

  private

  def notify_client
    ConcatTvSchema.subscriptions.trigger(
      'channelAddedToPlaylist',
      {},
      {
        operation_type: 'ADDED',
        channel: context.channel,
        playlist: context.playlist,
      }
    )
  end
end
