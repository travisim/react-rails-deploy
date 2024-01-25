class AddForumThreadToForumThreadComments < ActiveRecord::Migration[7.1]
  def change
    add_reference :forum_thread_comments, :forum_thread, null: false, foreign_key: true
  end
end
