require 'rails_helper'

RSpec.describe Reward, type: :model do
  it 'is valid with valid attributes' do
    reward = Reward.new(name: "Test Reward", points_required: 10)
    expect(reward).to be_valid
  end

  it 'is not valid without a name' do
    reward = Reward.new(points_required: 10)
    expect(reward).to_not be_valid
  end
end