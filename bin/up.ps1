#!/usr/bin/env pwsh

# Make sure Ruby 2.7.0 and bundler are installed
# Make sure Node.js 12.x and yarn are installed
# Make sure docker and docker-compose are installed

gem install foreman

Set-Content ./config/master.key "30a2dc62b4ec041f04519ff2b9d2d66d"

yarn install

docker-compose -p tv -f tv.dev.yml up -d

# Give database some time to start and then run:
# rails db:migrate
