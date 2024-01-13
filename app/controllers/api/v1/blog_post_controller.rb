class Api::V1::BlogPostController < ApplicationController
  before_action :set_blogPost, only: %i[show destroy]
  def index
    blogPost = BlogPost.all.order(created_at: :desc)
    render json: blogPost
  end

  def create
    blogPost = BlogPost.create!(blogPost_params)
    if blogPost
      render json: blogPost
    else
      render json: blogPost.errors
    end
  end

  def show
    render json: @blogPost
  end

  def destroy
    @blogPost&.destroy
    render json: { message: 'Post deleted!' }
  end

  private

  def blogPost_params
    params.permit(:title, :body)
  end
  def set_blogPost
    @blogPost = BlogPost.find(params[:id])
  end
end
