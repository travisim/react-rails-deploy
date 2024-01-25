class AddAuthorToForumThreads < ActiveRecord::Migration[7.1]
  def change
    add_column :forum_threads, :author, :string
  end
end
