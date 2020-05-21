Rails.application.routes.draw do

  # devise_for :users, controllers: {
  #   registrations: "users/registrations",
  # }
  # delete "destroy_user_session", to: "devise/sessions#destroy"
  # devise_scope :user do
  #   get "user_show", to: "users/registrations#show"
  #   get "user_destroy", to: "users/sessions#index"
  # end
  root 'posts#index'
  resources :posts, only: [:new, :create, :show, :edit]
  
end
