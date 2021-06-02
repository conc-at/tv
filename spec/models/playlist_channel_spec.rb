# frozen_string_literal: true

require 'rails_helper'

RSpec.describe PlaylistChannel, type: :model do
  subject(:playlist_channel) { playlist.channels.create(channel) }

  context 'when channel added to playlist' do
    let(:channel) { attributes_for(:channel) }
    let(:playlist) { create(:playlist) }

    it 'creates a new row' do
      expect { playlist_channel }.to change(playlist.channels, :count).by(1)
    end
  end
end
