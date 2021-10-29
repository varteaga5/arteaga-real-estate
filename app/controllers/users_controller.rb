class UsersController < ApplicationController
# this skips the before action of authorize on the create method
skip_before_action :authorize, only: :create

    # sign up feature
    def create
        user = User.create!(user_params)
        # if the user is valid:
        # save a new user to the DB with their username, encrypted password, img url, and wants
        # save the user's ID in the session hash
        session[:user_id] = user.id
        # return a JSON response with the user's ID, username, img url, and wants, and a HTTP status code of 201 created
        render json: user, status: :created
    end

    # creates house associated with a user
    def create_house
        house = @current_user.houses.create(house_params)
        render json: house, include: 'houses'
    end
    
    # auto login feature
    def show
        # if the user is logged in (if their user_id is in the session hash)
        # using include: :houses allows the associated houses to be sent to the front end
        render json: @current_user, include: 'houses'
    end
    
    def show_houses
        render json: @current_user, include: 'houses'
    end
    
    def delete_house
        house = House.find_by(id: params[:id])
        house.destroy
        render json: @current_user, include: 'houses'
    end
    
    def update_house
        house = House.find_by(id: params[:id])
        house.update(house_params)
        render json: @current_user, include: 'houses'
    end

    private

    # use of strong params prevents the user from unwanted changes to attributes
    def user_params
        params.permit(:username, :password, :password_confirmation, :wants)
    end

    def house_params
        params.permit(:address, :description)
    end
end

