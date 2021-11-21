Rails.application.routes.draw do
  # namespace :api do
  post "/signup", to: "users#create"
  post "/createhouse", to: "houses#create_house" 
  post "/login", to: "sessions#create"

  get "/me", to: "users#show"
  get "/showhouses", to: "houses#show_houses" 

  patch "/showhouses/:id", to: "houses#update_house" 

  delete "/showhouses/houses/:id", to: "houses#delete_house"
  delete "/logout", to: "sessions#destroy"
  # end
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  # get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
  
end

