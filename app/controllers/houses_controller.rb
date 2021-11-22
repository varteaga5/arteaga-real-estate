class HousesController < ApplicationController

    def search
        search = @current_user.houses.query(params[:query])
        render json: search
    end
    
    def index
        render_houses
    end

    def create
        new_house = @current_user.houses.create(house_params)
        render json: new_house, status: :created
    end

    def update
        house = find_house
        house.update(house_params)
        render_houses
    end
    
    def destroy
        house = find_house
        house.destroy
        render_houses
    end
    
    private
    
    def house_params
        params.permit(:address, :description)
    end
    
    def find_house
        @house = House.find_by(id: params[:id])
    end
    
    def render_houses
        render json: @current_user.houses
    end
    
end