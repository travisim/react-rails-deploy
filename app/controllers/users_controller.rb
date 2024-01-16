class UsersController < ApplicationController
    # protect_from_forgery with: :null_session
    skip_before_action :verify_authenticity_token
    def index
    end
    def login
        # puts "--------------------------------------- "
        puts User.inspect
        user = User.find_by(username: params[:username])
        puts User.inspect

        if user #&& user.authenticate(params[:password])
           payload = {user_id: user.id}
           token = encode(payload)
              render json: {user: user, token: token}

        else
            # puts "-------------------------d-------------- "

            render json: {error: "Invalid username or password"}
        end
    end
    def token_authenticate
            puts "-------------------------d-------------- "

        token = request.headers["Authenticate"]
        user = User.find(decode(token)["user_id"])
        render json: user
    end
  end
  