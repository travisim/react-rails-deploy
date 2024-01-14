class ForumThreadComment < ApplicationRecord
    validates :body, presence: true
    # belongs_to :user
    # belongs_to :forum_thread
end
