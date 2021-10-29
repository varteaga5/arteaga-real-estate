Rails.application.routes.draw do
  # namespace :api do
  post "/signup", to: "users#create"
  post "/createhouse", to: "users#create_house"
  get "/me", to: "users#show"
  get "/showhouses", to: "users#show_houses"
  patch "/showhouses/:id", to: "users#update_house"
  delete "/showhouses/houses/:id", to: "users#delete_house"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  # end
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  # get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
  
end
