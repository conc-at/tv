FROM ruby:2.6.6-alpine3.13

ENV RAILS_ENV=production

WORKDIR /app

COPY Gemfile Gemfile
COPY Gemfile.lock Gemfile.lock

COPY package.json package.json
COPY yarn.lock yarn.lock

RUN gem install bundler

RUN apk --update add bash postgresql-client tzdata yarn nodejs libcurl
RUN apk --update add --virtual build-dependencies \
    git \
    build-base \
    postgresql-dev \
    && bundle install \
    && yarn install \
    && apk del build-dependencies

# required by config/puma.rb
RUN mkdir -p tmp/pids

ENV NODE_ENV=production

COPY . .

RUN ./bin/webpack

EXPOSE 3000
