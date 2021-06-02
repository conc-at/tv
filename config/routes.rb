# frozen_string_literal: true

Rails.application.routes.draw do
  root 'page#index'

  get '/services/ping', to: 'services#ping'

  get '/export/:id', to: 'export#download'

  post '/graphql', to: 'graphql#execute'
  mount GraphiQL::Rails::Engine, at: '/graphiql', graphql_path: '/graphql' if Rails.env.development?

  require 'sidekiq/web'
  require 'sidekiq/cron/web'
  mount Sidekiq::Web => '/jobs'

  get '*path' => 'page#index'
end
