silex-cartodb
=============

## Requeriments

* PHP 5.3+
* Node 0.10+
* Ruby 1.9.3+

Install globally dependencies:

    npm install -g grunt-cli bower


## To install

    curl -sS https://getcomposer.org/installer | php
    php composer.phar install
    bundle install
    npm install
    bower install

## To run

**First duplicate and rename `web/.htaccess.dist` to `web/.htaccess`.**

On development
    
    grunt
    grunt watch

On production
    
    grunt build    

# Deploy

    bundle exec cap staging deploy
