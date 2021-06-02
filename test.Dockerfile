FROM ruby:2.6.6-alpine3.13

ENV RAILS_ENV=test
ENV RAILS_MASTER_KEY=30a2dc62b4ec041f04519ff2b9d2d66d
ENV DB_HOST=db
ENV REDIS_URL=redis://redis:6379

WORKDIR /app

COPY Gemfile Gemfile
COPY Gemfile.lock Gemfile.lock

RUN gem install bundler

RUN apk --update add bash postgresql-client tzdata
RUN apk --update add --virtual build-dependencies \
    git \
    build-base \
    postgresql-dev \
    && bundle install \
    && apk del build-dependencies

COPY . .
