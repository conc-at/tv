# frozen_string_literal: true

class ExportPlaylist
  include Interactor

  def call
    playlist = Playlist.find(context.id)

    context.playlist = playlist.channels.reduce(header) do |output, channel|
      output += "#{channel.data} #{channel.path}\n\n"
      output
    end
  rescue ActiveRecord::RecordNotFound
    context.fail!(error: "No playlist for ID: '#{context.id}'")
  rescue StandardError
    context.fail!(error: 'Cannot export playlist')
  end

  private

  def header
    "#EXTM3U\n\n"
  end
end
