class Api::V1::UsersController < ApplicationController
  before_action :set_user, only: %i[show destroy]
  def index
    user = User.all.order(created_at: :desc)
    render json: user
  end

  def create
    # puts "poiuytyuioiuyhgbhn"
    # puts params.inspect
    # testUser = User.save(user_params)
    # if testUser.errors[:username] == '["has already been taken"]'
    #   render json: { error: 'Username already taken' }
    # else
    user = User.create!(user_params)
    if user
      render json: user
    else
      render json: user.errors
    end
  end

  

  def show
    render json: @user
  end

  def destroy
    @user&.destroy
    render json: { message: 'Post deleted!' }
  end

  private

  def user_params
    params.require(:user).permit(:username)
  end
  def set_user
    @user = User.find(params[:id])
  end
end
