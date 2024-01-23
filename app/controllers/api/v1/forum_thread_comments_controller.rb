class Api::V1::ForumThreadCommentsController < ApplicationController
    before_action :set_forumThreadComment, only: %i[show destroy update]
    before_action :get_commentsForCurrentThread, only: %i[showCommentsForThread]
    def index
      forumThreadComment = ForumThreadComment.all.order(created_at: :desc)
      render json: forumThreadComment 
    end
    def showCommentsForThread
      
      render json: @commentsForCurrentThread
    end
  
    def create
      forumThreadComment = ForumThreadComment.create!(forumThreadComment_params)
      if forumThreadComment
        render json: forumThreadComment
      else
        render json: ForumThreadComment.errors
      end
    end
    def update 
      if @forumThreadComment.update(forumThreadComment_params)
        render json:  { message: 'Comment Edited!' }
      else
        render nothing: true, status: :unprocessable_entity
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
      params.require(:forum_thread_comment).permit( :body,:forum_thread_id, :user_id)
    end
     
   
    def set_forumThreadComment
      @forumThreadComment = ForumThreadComment.find(params[:id])
    end

    def get_commentsForCurrentThread
      @commentsForCurrentThread  = ForumThreadComment.where(:forum_thread_id => params[:forum_thread_id]).order(created_at: :desc)
    end


  end
  