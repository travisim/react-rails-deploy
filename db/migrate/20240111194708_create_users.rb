class CreateUsers < ActiveRecord::Migration[7.1]
  def change
    create_table :users do |t|
      t.string :email, null: false
      t.string :password_digest 
      t.string :first_name, null: false
      t.string :last_name, null: false
      t.string :username, null: false
      t.date :birthday, null: false
      t.string :image , default: "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
      

      t.timestamps
    end
  end
end
