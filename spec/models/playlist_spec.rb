# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Playlist, type: :model do
  subject(:playlist) { described_class.create!(params) }

  context 'when playlist created' do
    let(:params) { attributes_for(:playlist) }

    it 'creates a new row' do
      expect { playlist }.to change(described_class, :count).by(1)
    end
  end
end
