# frozen_string_literal: true

class ExportController < ApplicationController
  def download
    result = ExportPlaylist.(id: params[:id])

    return render_result_error(result) if result.failure?

    render plain: result.playlist
  end

  private

  def render_result_error(result)
    render plain: result.error, status: :bad_request
  end
end
