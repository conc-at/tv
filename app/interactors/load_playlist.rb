# frozen_string_literal: true

class LoadPlaylist
  include Interactor

  def call
    context.playlist.segments&.each do |segment|
      Channel.find_or_create_by!(data: segment.tags.to_json, path: segment.path)
    end
  rescue StandardError => e
    context.fail!(error: e.message)
  end
end
