Rails.application.routes.draw do
  # namespace :api do

  get "/housesQuery/:query", to: "houses#search"

  resources :houses

  post "/signup", to: "users#create"
  post "/login", to: "sessions#create"
  get "/me", to: "users#show"
  delete "/logout", to: "sessions#destroy"
  # end
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  # get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
  
end

# change part of url

# keeping sep of concerns