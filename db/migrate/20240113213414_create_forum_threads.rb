class CreateForumThreads < ActiveRecord::Migration[7.1]
  def change
    create_table :forum_threads do |t|
      t.string :title, null: false
      t.text :body, null: false
      t.string :category, null: false
      t.string :author, null: false

      t.timestamps
    end
  end
end
