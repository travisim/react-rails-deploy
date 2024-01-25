class AddUsersToForumThreadComments < ActiveRecord::Migration[7.1]
  def change
    add_reference :forum_thread_comments, :user, null: false, foreign_key: true
  end
end
