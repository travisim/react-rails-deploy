class AddUserAssociationToForumThread < ActiveRecord::Migration[7.1]
  def change
    add_reference :forum_threads, :user, null: false, foreign_key: true
  end
end
