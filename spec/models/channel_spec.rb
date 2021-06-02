# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Channel, type: :model do
  context 'without a position value' do
    let!(:channel) { create(:channel) }
    let!(:channel2) { create(:channel) }

    it 'gets 1/1 position calculated when inserted first' do
      expect(described_class.find(channel.id).position).to eql(1 / 1r)
    end

    it 'gets 2/1 position calculated when inserted second' do
      expect(described_class.find(channel2.id).position).to eql(2 / 1r)
    end
  end

  context 'when moved after another channel' do
    let!(:channel) { create(:channel) }
    let!(:channel2) { create(:channel) }

    it 'has position value changed' do
      expect { channel.move(channel2.id) }.to(change(channel, :position))
    end

    it 'has a higher position value than the adjacent channel' do
      expect(channel.move(channel2.id).position).to be > channel2.position
    end
  end

  context 'when moved before another channel' do
    let!(:channel) { create(:channel) }
    let!(:channel2) { create(:channel) }

    it 'has position value changed' do
      expect { channel2.move(channel.id, before: true) }.to(change(channel2, :position))
    end

    it 'has a lower position value than the adjacent channel' do
      expect(channel2.move(channel.id, before: true).position).to be < channel.position
    end
  end

  context 'when moved to the end' do
    let!(:channel) { create(:channel) }
    let!(:channel2) { create(:channel) }

    it 'has highest position value' do
      expect(channel.move_to_end.position).to be > channel2.position
    end
  end

  context 'when moved to the start' do
    let!(:channel) { create(:channel) }
    let!(:channel2) { create(:channel) }

    it 'has lowest position value' do
      channel2.move_to_start
      expect(channel2.position).to be < channel.position
    end
  end
end
