# frozen_string_literal: true

source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.6.6'

gem 'bootsnap', '>= 1.4.2', require: false
gem 'graphql', '~>1.12.12'
gem 'hiredis', '~> 0.6.3'
gem 'interactor-rails', '~> 2.2.1'
gem 'jbuilder', '~> 2.7'
gem 'pg', '>= 0.18', '< 2.0'
gem 'puma', '~> 4.3'
gem 'rails', '~> 6.0.2', '>= 6.0.2.2'
gem 'redis', '~> 4.0'
gem 'rm3u', github: 'jonaskay/rm3u', branch: 'master'
gem 'sass-rails', '>= 6'
gem 'sidekiq', '~> 6.0.6'
gem 'sidekiq-cron', '~> 1.2.0'
gem 'turbolinks', '~> 5'
# gem 'typhoeus', '~> 1.3.1'
gem 'webpacker', '~> 5.1'

group :development, :test do
  gem 'byebug', platforms: %i[mri mingw x64_mingw]
  gem 'dotenv-rails', '~> 2.7.5'
  gem 'factory_bot_rails', '~> 5.2.0'
  gem 'faker', '~> 2.11.0'
  gem 'rspec-collection_matchers', '1.2.0'
  gem 'rspec-rails', '~> 4.0.0'
  gem 'simplecov', '~> 0.18.5', require: false, group: :test
end

group :development do
  gem 'graphiql-rails'
  gem 'listen', '>= 3.0.5', '< 3.3'
  gem 'rubocop'
  gem 'rubocop-faker'
  gem 'rubocop-performance'
  gem 'rubocop-rails'
  gem 'rubocop-rspec'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
  gem 'web-console', '>= 3.3.0'
end

gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]
