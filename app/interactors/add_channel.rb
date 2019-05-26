# frozen_string_literal: true

class AddChannel
  include Interactor

  def call
    context.channel = Channel.create!(
      data: context.data,
      path: context.path,
      state: context.state
    )
    notify_client
  rescue StandardError => e
    context.fail!(error: e.message)
  end

  private

  def notify_client
    ConcatTvSchema.subscriptions.trigger(
      'channelAdded',
      {},
      context.channel
    )
  end
end
