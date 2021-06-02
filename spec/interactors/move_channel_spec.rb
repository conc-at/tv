# frozen_string_literal: true

require 'rails_helper'

RSpec.describe MoveChannel, type: :interactor do
  subject(:context) { described_class.(params) }

  describe '.call' do
    context 'when provided valid params' do
      let(:from_id) { create(:channel).id }
      let(:to_id) { create(:channel).id }
      let(:params) { { from_id: from_id, to_id: to_id } }

      it 'succeeds' do
        expect(context).to be_a_success
      end
    end
  end
end
