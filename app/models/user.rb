class User < ApplicationRecord
    has_secure_password
    validates :email, presence: true,format:{with: /\A[^@\s]+@[^@\s]+\z/ , message:"not valid email address"} , uniqueness: true
    validates :password, presence: true
    validates :password_confirmation, presence: true
    validates :first_name, presence: true
    validates :last_name, presence: true
    validates :username, presence: true, uniqueness: true
    validates :birthday, presence: true


    

end
