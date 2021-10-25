class HousesController < ApplicationController
    # returns a list of all the recipes
    def index
        houses = House.all
        render json: houses
    end

    def create
        # we can call '.houses' on the current user because of the associations coded in the houses serializer: "has_one :user"
        new_house = @current_user.houses.create!(house_params)
        render json: new_house, status: :created
    end

    def destroy
        house = House.find_by(id: params[:id])
        if house
            house.destroy
            head :no_content
        else
            render json: { error: "House not found" }, status: :not_found
        end
    end

    private
    # use of strong params prevents the user from unwanted changes to attributes
    def house_params
        params.permit(:address, :description)
    end
end
