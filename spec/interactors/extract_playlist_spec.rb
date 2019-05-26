# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ExtractPlaylist, type: :interactor do
  subject(:context) { described_class.(params) }

  describe '.call' do
    context 'when provided valid params' do
      let(:params) { { url: url } }
      let(:url) { Faker::Internet.url }

      before do
        response = Typhoeus::Response.new(code: 200, body: '')
        Typhoeus.stub(url).and_return(response)
      end

      it 'succeeds' do
        expect(context).to be_a_success
      end
    end
  end
end
