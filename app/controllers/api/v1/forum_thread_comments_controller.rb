class Api::V1::ForumThreadCommentsController < ApplicationController
    before_action :set_forumThreadComment, only: %i[show destroy]
    def index
      forumThreadComment = ForumThreadComment.all.order(created_at: :desc)
      render json: forumThreadComment 
    end
  
    def create
      forumThreadComment = ForumThreadComment.create!(forumThreadComment_params)
      if forumThreadComment
        render json: forumThreadComment
      else
        render json: ForumThreadComment.errors
      end
    end
  
    def show
      render json: @forumThreadComment
    end
  
    def destroy
      @forumThreadComment&.destroy
      render json: { message: 'Post deleted!' }
    end
  
    private
  
    def forumThreadComment_params
      params.require(:forum_thread_comments).permit( :body,:forum_thread_id, :user_id)
    end
    def set_forumThreadComment
      @forumThreadComment = ForumThreadComment.find(params[:id])
    end
  end
  