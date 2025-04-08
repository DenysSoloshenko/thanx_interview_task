class RewardRedemptionService
  def initialize(user:, reward:)
    @user = user
    @reward = reward
  end

  def call
    raise "Not enough points" if @user.points_balance < @reward.cost

    ActiveRecord::Base.transaction do
      @user.update!(points_balance: @user.points_balance - @reward.cost)
      @user.redemptions.create!(reward: @reward)
    end
  end
end