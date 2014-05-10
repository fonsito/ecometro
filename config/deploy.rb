lock '3.1.0'

set :application, 'silex-cartodb'
set :repo_url, 'git@github.com:simbiotica/silex-cartodb.git'

set :branch, 'master'
ask(:password, 'secret')

set :deploy_to, '/var/www/silex-cartodb'
set :scm, :git

set :format, :pretty
set :log_level, :debug
set :pty, true

set :linked_files, %w{web/.htaccess}
set :keep_releases, 3

namespace :deploy do

  desc 'Installing vendors'
  task :vendors do
    on roles(:all), in: :sequence, wait: 5 do
      execute "cd #{current_path} && bundle install"
      execute "cd #{current_path} && curl -sS https://getcomposer.org/installer | php"
      execute "cd #{current_path} && php composer.phar install --no-dev --verbose --prefer-dist --optimize-autoloader"
      execute "cd #{current_path} && npm install"
    end
  end

  desc 'Installing assets'
  task :assets do
    on roles(:all), in: :sequence, wait: 5 do
      execute "cd #{current_path} && bower install"
      execute "cd #{current_path} && grunt build"
    end
  end

  desc 'Restart application'
  task :restart do
    on roles(:app), in: :sequence, wait: 5 do
      # Your restart mechanism here
      execute "service apache2 restart"
    end
  end

  after :publishing, :restart
  before :restart, :vendors
  after :vendors, :assets

  after :restart, :clear_cache do
    on roles(:web), in: :groups, limit: 3, wait: 10 do
      execute "rm -rf #{current_path}/cache/*"
      execute "chmod -R 777 #{current_path}/cache"
    end
  end

end
