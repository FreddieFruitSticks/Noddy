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

Noddy FE is hosted on vercel https://vercel.com/dashboard (on Freddie's personal account)

Staging: noddy-dev.vercel.app. Admin noddy.m4v.co.za/wp-admin (passwords were sent out to RT members)
Production: noddy.vercel.app. Admin noddy.prod.m4v.co.za/wp-admin (same as dev passowrds)

To deploy to production simply push to master branch. To deploy to Staging push to develop branch

Check vercel for env vars such as WP_AUTH_TOKEN

Email env vars are in `/var/www/html/wordpress/wp-config.php`

## Google Cloud Platform

Production noddy is held with maverick labs as an f1 micro vm. Development is held on Freddie's personal GCP account. Ask both for access. 

If for whatever reason you need to migrate VMs between project; To migrate a vm from one project to another, first you must grant your user access to the noddy project (if you dont have access to the Noddy project as freddie or Emma (m4verick labs)). Then assign the service role `service account user` role to the right service account. In this case I had to assign this role to `19446431913-compute@developer.gserviceaccount.com`. Then assign `Compute Image User` role to your user. Create a machine image and create a VM instance using that machine imagine as below.

`gcloud beta compute instances create noddy --project=dex-m-5ad68 --zone us-central1-a --source-machine-image projects/noddy-285919/global/machineImages/noddy-2 --service-account 19446431913-compute@developer.gserviceaccount.com`

### Misc

email provider:
https://app.sendgrid.com/settings/sender_auth

Cloud service provider:
Google compute engine (freddiescomputekingdom and maverick labs) - if you need access email me or whatsapp me.

stack:
Wordpress + nextjs + reactjs + nginx

noddy.co.za DNS details email Yoan: webmaster@estart.co.za
