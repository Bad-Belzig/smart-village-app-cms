Rails.application.routes.draw do
  resources :news_items
  resources :tours
  resources :point_of_interests
  resources :events
  match "/login", to: 'session#create', as: :log_in, via: [:get, :post]
  get '/logout', to: 'session#destroy'
  get 'dashboard/index'

  root "dashboard#index"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
