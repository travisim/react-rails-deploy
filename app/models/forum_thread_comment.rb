class ForumThreadComment < ApplicationRecord
    validates :body, presence: true
    belongs_to :user, required: true
    belongs_to :forum_thread, required: true
end
