# Noddy

Stack:
ReactJS
NextJS
Wordpress


App hosted on Vercel. WP admin hosted on Maverick Labs google compute servers.

Email parents plugin requires webpack build:

`npx webpack --config webpack.config.js ./src/fetch_emails.js -o ../email-parents/includes/fetch_emails.js  --mode production`

To upload files to WP server:

`sudo gcloud compute scp --recurse ../email-parents noddy-dev:/var/www/html/wordpress/wp-content/plugins/ --zone us-central1-a`
