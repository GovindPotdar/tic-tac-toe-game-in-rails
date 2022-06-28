Rails.application.routes.draw do
  
  root 'homes#index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  devise_for :users, controllers: {
    sessions: 'users/sessions'
  }

  resources :games do 
    get "join/:id",to:"games#join", on: :collection, as: "join"
  end

end
