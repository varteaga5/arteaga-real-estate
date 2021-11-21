class HousesController < ApplicationController

    def create_house
        house = @current_user.houses.create(house_params)
        render json: house, status: :created
    end

    def show_houses
        render json: @current_user
    end
    
    def update_house
        house = House.find_by(id: params[:id])
        house.update(house_params)
        render json: @current_user
    end
    
    def delete_house
        house = House.find_by(id: params[:id])
        house.destroy
        render json: @current_user
    end
    
    private
    
    def house_params
        params.permit(:address, :description)
    end
    
end
