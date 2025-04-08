class Api::RedemptionsController < ApplicationController
  def create
    user = User.find(params[:user_id])
    reward = Reward.find(params[:reward_id])

    RewardRedemptionService.new(user: user, reward: reward).call
    render json: { success: true }

  rescue => e
    render json: { error: e.message }, status: :unprocessable_entity
  end

  def history
    user = User.find(params[:id])
    render json: user.redemptions.includes(:reward).map { |r| { reward: r.reward.title, redeemed_at: r.created_at } }
  end
end
