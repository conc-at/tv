# frozen_string_literal: true

class CreatePlaylist
  include Interactor

  def call
    context.playlist = Playlist.create!(name: context.name)

    notify_client
  rescue ActiveRecord::RecordNotUnique
    context.fail!(error: I18n.t('create_playlist.errors.exists'))
  rescue StandardError
    context.fail!(error: I18n.t('create_playlist.errors.generic'))
  end

  private

  def notify_client
    ConcatTvSchema
      .subscriptions
      .trigger('playlistCreated', {}, context.playlist)
  end
end
