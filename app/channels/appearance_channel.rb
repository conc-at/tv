# frozen_string_literal: true

class AppearanceChannel < ApplicationCable::Channel
  attr_reader :username

  ROOM = 'appearances'
  private_constant :ROOM

  ANONYMOUS = 'anonymous'
  private_constant :ANONYMOUS

  def appear(data)
    @username = data['user']['name']

    return if username.blank? || username == ANONYMOUS

    appearances.add(username)

    ConcatTvSchema.subscriptions.trigger(
      'userOnline',
      {},
      { name: username }
    )
  end

  def disappear(data)
    @username = data['user']['name']

    return if username.blank? || username == ANONYMOUS

    go_offline(username)
  end

  private

  def subscribed
    stream_from ROOM
  end

  def unsubscribed
    go_offline(username)
  end

  def go_offline(username)
    return if username.blank?

    appearances.delete(username)

    ConcatTvSchema.subscriptions.trigger(
      'userOffline',
      {},
      { name: username }
    )
  end

  def appearances
    @appearances ||= Appearance::Store.new(name: 'appearances')
  end
end
