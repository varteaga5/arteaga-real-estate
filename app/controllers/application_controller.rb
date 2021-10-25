class ApplicationController < ActionController::API
  include ActionController::Cookies
  # exception handling used with create!
  # allows us to explicitly code for the happy path and RoR will handle any exceptions
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  # This will make everything in the application require the user to be logged in in order to use it
  before_action :authorize

  private
  # runs when the "before_action" is called
  def authorize
    #finds the user by id that is in the session
    # assigns the user to the instance variable current_user
    @current_user = User.find_by(id: session[:user_id])
    # unless the session includes :user_id, return an error
    render json: { errors: ["not this error"] }, status: :unauthorized unless @current_user
  end

  def render_unprocessable_entity_response
    render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
  end

end
