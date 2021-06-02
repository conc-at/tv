# frozen_string_literal: true

class ServicesController < ApplicationController
  def ping
    render plain: 'pong'
  end
end
