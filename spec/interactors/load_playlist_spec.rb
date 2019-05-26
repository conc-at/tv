# frozen_string_literal: true

require 'rails_helper'

RSpec.describe LoadPlaylist, type: :interactor do
  subject(:context) { described_class.(playlist: m3u_playlist) }

  describe '.call' do
    context 'when provided valid params' do
      let(:file) { file_fixture('playlist.m3u').read }
      let(:m3u_playlist) { Rm3u::Playlist.parse(file) }

      it 'succeeds' do
        expect(context).to be_a_success
      end
    end
  end
end
