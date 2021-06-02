# frozen_string_literal: true

require 'rails_helper'

RSpec.describe AddChannel, type: :interactor do
  subject(:context) { described_class.(params) }

  describe '.call' do
    context 'when provided valid params' do
      let(:params) { { data: 'mydata', path: '/1', state: :online } }

      it 'succeeds' do
        expect(context).to be_a_success
      end

      it 'creates row' do
        expect { context }.to change(Channel, :count).by(1)
      end
    end

    context 'when missing a param' do
      let(:params) { { data: 'mydata', path: '/1' } }

      it 'fails' do
        expect(context).to be_a_failure
      end
    end
  end
end
