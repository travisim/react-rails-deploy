class Api::V1::ForumThreadController < ApplicationController
  before_action :set_forumThread, only: %i[show destroy]
  def index
    forumThread = ForumThread.all.order(created_at: :desc)
    render json: forumThread
  end

  def create
    forumThread = ForumThread.create!(forumThread_params)
    if forumThread
      render json: forumThread
    else
      render json: forumThread.errors
    end
  end

  def show
    render json: @forumThread
  end

  def destroy
    @forumThread&.destroy
    render json: { message: 'Post deleted!' }
  end

  private

  def forumThread_params
    params.require(:forum_thread).permit(:title, :body,:category,:user_id)
  end
  def set_forumThread
    @forumThread = ForumThread.find(params[:id])
  end
end
