# frozen_string_literal: true

require 'rails_helper'

RSpec.describe CreatePlaylist, type: :interactor do
  subject(:context) { described_class.(params) }

  describe '.call' do
    context 'when provided valid params' do
      let(:params) { { name: 'name' } }

      it 'succeeds' do
        expect(context).to be_a_success
      end
    end

    context 'when missing a param' do
      let(:params) { {} }

      it 'fails' do
        expect(context).to be_a_failure
      end
    end
  end
end
