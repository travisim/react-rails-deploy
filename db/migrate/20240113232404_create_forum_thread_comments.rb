class CreateForumThreadComments < ActiveRecord::Migration[7.1]
  def change
    create_table :forum_thread_comments do |t|
      t.text :body

      t.timestamps
    end
  end
end
