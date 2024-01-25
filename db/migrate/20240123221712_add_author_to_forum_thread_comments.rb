class AddAuthorToForumThreadComments < ActiveRecord::Migration[7.1]
  def change
    add_column :forum_thread_comments, :author, :string
  end
end
