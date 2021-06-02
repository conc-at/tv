# frozen_string_literal: true

Rails.application.configure do
  redis = config_for(:redis)

  Sidekiq.configure_server do |config|
    config.redis = redis
  end

  Sidekiq.configure_client do |config|
    config.redis = redis
  end

  schedule_file = 'config/cron.yml'
  if File.exist?(schedule_file) && Sidekiq.server?
    jobs = YAML.load_file(schedule_file)
    Sidekiq::Cron::Job.load_from_hash jobs if jobs
  end
end
