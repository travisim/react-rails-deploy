class ForumThread < ApplicationRecord
   validates :title, presence: true
    validates :body, presence: true
    validates :category, presence: true
    belongs_to :user
    has_many :forum_thread_comments, dependent: :destroy
end
