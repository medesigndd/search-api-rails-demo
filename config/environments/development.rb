GnipSearchDemo::Application.configure do
  # Settings specified here will take precedence over those in config/application.rb.

  # In the development environment your application's code is reloaded on
  # every request. This slows down response time but is perfect for development
  # since you don't have to restart the web server when you make code changes.
  config.cache_classes = false

  # Do not eager load code on boot.
  config.eager_load = false

  # Show full error reports and disable caching.
  config.consider_all_requests_local       = true
  config.action_controller.perform_caching = false

  # Print deprecation notices to the Rails logger.
  config.active_support.deprecation = :log

  # Do not compress assets
  config.assets.compress = false

  # Sass Debugging with source maps :)
  config.assets.debug = true
  config.sass.debug_info = true
  config.sass.line_comments = false # source maps don't get output if this is true
end
