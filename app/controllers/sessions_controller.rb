class SessionsController < ApplicationController
    # the before action will SKIP the authorize function on the create method
    skip_before_action :authorize, only: :create
    # log in feature
    def create
        #in the sessions controller, a 'session' is create by finding a user by its username 
        user = User.find_by(username: params[:username])
        # if the user's username and pw are authenticated
        # ".&" is used equally to 'user && user.authenticate(params[:password]).
        # authenticate method enabled with bcrypt
        if user&.authenticate(params[:password])
            # save the user's ID in the session hash  
            session[:user_id] = user.id
            # return a JSON response with the user's ID, username, image URL, and wants
            render json: user
        else
            # if the user's username and password are not authenticated: 
            # return a JSON response with an error message, and a status of 401(unauthorized)
            render json: { errors: ["Invalid username or password"]}, status: :unauthorized
        end
    end
    # logout feature
    def destroy
        session.delete :user_id
        head :no_content
    end
end