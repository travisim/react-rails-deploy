class User < ApplicationRecord
    validates :name, presence: true
    has_many :forum_threads, dependent: :destroy
    has_many :forum_thread_comments, dependent: :destroy
end
