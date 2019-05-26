# frozen_string_literal: true

class MoveChannel
  include Interactor

  def call
    channel = Channel.find(context.from_id)
    channel.move(context.to_id, before: context.before)

    notify_client
  rescue StandardError => e
    context.fail!(error: e.message)
  end

  private

  def notify_client
    ConcatTvSchema
      .subscriptions
      .trigger(
        'channelMoved', {},
        {
          from_id: context.from_id,
          to_id: context.to_id,
          before: context.before,
        }
      )
  end
end
