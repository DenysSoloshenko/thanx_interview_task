class Api::RedemptionsController < ApplicationController
  def create
    user = User.find(params[:user_id])
    reward = Reward.find(params[:reward_id])

    if user.points_balance >= reward.cost
      user.points_balance -= reward.cost
      user.save!
      user.redemptions.create!(reward: reward)
      render json: { success: true }
    else
      render json: { error: 'Not enough points' }, status: 400
    end
  end

  def history
    user = User.find(params[:id])
    render json: user.redemptions.includes(:reward).map { |r| { reward: r.reward.title, redeemed_at: r.created_at } }
  end
end
