class RemoveAuthorFromForumThreads < ActiveRecord::Migration[7.1]
  def change
    remove_column :forum_threads, :author, :string
  end
end
