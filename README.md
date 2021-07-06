# Noddy

## Developer README

Stack:
ReactJS
NextJS
Wordpress


App hosted on Vercel. WP admin hosted on Maverick Labs and Freddiescomputekingdom google compute servers.

### Wordpress and php

Email parents plugin requires webpack build:

`npx webpack --config webpack.config.js ./src/fetch_emails.js -o ../email-parents/includes/fetch_emails.js  --mode production`

To upload plugin files to WP server:

`sudo gcloud compute scp --recurse ../email-parents noddy-dev:/var/www/html/wordpress/wp-content/plugins/ --zone us-central1-a`

`sudo gcloud compute scp ./WP_plugins/event-api-plugin.php  noddy-dev:/var/www/html/wordpress/wp-content/plugins/event-api-plugin --zone us-central1-a`

env vars are on the google compute insance in `/etc/php/7.3/fpm/pool.d/www.conf` eg `env['RECAPTCHA_SECRET']=...`. Once this file is updated restart php-fpm

`sudo systemctl restart php7.3-fpm.service`

For this to take effect I had to `set clear_env=no`

Error logs in `/var/www/html/wordpress/wp-content`

## Reactjs/Nextjs

Noddy FE is hosted on vercel https://vercel.com/dashboard

Check vercel for env vars such as WP_AUTH_TOKEN

Email env vars are in `/var/www/html/wordpress/wp-config.php`

### Misc

email provider:
https://app.sendgrid.com/settings/sender_auth

Cloud service provider:
Google compute engine (freddiescomputekingdom and maverick labs) - if you need access email me or whatsapp me.

stack:
Wordpress + nextjs + reactjs + nginx

noddy.co.za DNS details email Yoan: webmaster@estart.co.za
