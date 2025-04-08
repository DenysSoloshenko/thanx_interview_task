class Api::UsersController < ApplicationController
  def show_points_balance
    user = User.find(params[:id])
    render json: { points: user.points_balance }
  end
end
