# Noddy

## How to use the site

There are three main "sites": 
1) `noddy.co.za` (the main site the client sees) (staging site: `noddy-dev.vercel.app`) 
2) `noddy.prod.m4v.co.za/wp-admin` (the main admin site) (staging site: `noddy.m4v.co.za/wp-admin`) 
3) `noddy.co.za/elf-admin` (the "site" that deals with gift wrapping admin on the night of the event) (staging site: `noddy-dev.vercel.app/elf-admin`) 

To use the client site is straight forward. Most of this how-to will focus on the two admin sites.

### Main admin site (noddy.prod.m4v.co.za/wp-admin)

First login using your username and password. Once logged in you should see a panel on your left with various links like "posts", "media" and "pages".

The 5 titles we are interested in are:
1. Posts (where we have our own blog)
2. My events (the actual event days)
3. Parties (the groups that have booked - called a party)
4. Noddy Utils (some utility data needed to manage the site)
5. Email parents (to email the current list of people that noddy is reopening)

#### 1. Posts

This is simply for the blog. To view the blog go here https://noddy.co.za/blog. When writing a blog select the "blog post" category. For projects, select the "projects" category which can be viewed here https://noddy.co.za/projects

#### 2. My Events

These are the days the events take place. Usually on a Thursday, Friday and Saturday evening starting at 18:00. Clicking on this tile, you will see a set of days. You can add and delete days BUT DO SO WITH CAUTION! If people have booked for a day you delete, the data will be out of order. Only delete events AFTER the party has finished, but preferablly never delete events. Only modify.

Clicking on a day takes you to the number of tickets and the date. Set these as necessary.

When updating, click the "update" button on the right of the screen.

When all the tickets have been purchased OR the date has passed the date of the event, the event on the client app will show "unavailable". On the backend, however, you will still be able to add people to the event for any last minute bookings.

#### 3. Parties

These are the groups that have booked. Clicking on the parties tile you will see a list of all the parties. Take not of the columns, specifically the "Payment Confirmed" column (1 = true, 0 = false). This is useful when deleting unconfirmed bookings. Deleting the party will return the tickets to the event from which they booked.

Clicking on a party takes you to the details of the party where you can see the children list, number of adults, etc. You will see a payment confirmed (do not tamper with this unless you know what you are doing). The next item "email sent" is to confirm whether or not this party has been emailed for the next Noddy event.

#### 4. Noddy Utils

This if for utility control of the site; shutting down the Noddy event, changing the year, and changing the price per ticket.

Clicking on the Noddy Utils tile you will see one item called "Noddy Utils". DO NOT DELETE THIS. Only modify this. 

Clicking on the Noddy Utils item you will see the year of the party, price per ticket and bookings open/closed. 

Price per ticket will show on the client site, and it will also be used in the calculation of the price the group has to pay.
The year of the party will show up on the client site so that people know which year they are booking for.
Bookings open/closed controls the client site and makes all events unavailable and informs site onlookers that noddy is closed

#### 5. Email parents (CAUTION!!!)

This is further down the list (if you cant see it it's because you dont have access to view this). This is to send emails to all the parents from the previous year that Noddy is open.

Clicking on this takes you to a page with 1 button. Clicking this button will send a NODDY IS NOW OPEN email to EVERYONE.

### Elf Admin (noddy.co.za/elf-admin)

This site is for the elves to manage parents and kids when they arrive, and to help wrap gifts. This is not mobile friendly and will need to be used on Chrome to be able to follow certain instructions.

This site is run entirely on the browser, it is not linked to the backend. The only call made to the backend is on the first load. To reset the data of the app is purposefully difficult and will be explained later.

On the elf admin you will see three columns. Parties, Arrived and gift packed. You can filter by the date of the event. Clicking on a card expands it to see the list of children. Once you have clicked on all the children the card turns green to indicate the entire party has arrived. On the top right of the card is a checkbox, checking this turns the card blue. This is to indicate a separator between santa gift bags (all gifts above the first blue card are in bag 1, above 2nd blue card are in bag 2, etc). The arrived column will automatically order the the cards from the youngest child to the oldest.

How to use it:

When a party arrives, search for their name. Check that the card says "confirmed" (to indicate payment confirmed). expand the card and select all the children that have arrived. Move the card over to the "arrived" column.

Once the gift is packed move the card to the "gift packed" column. Unlike the "arrived" column this column is not ordered youngest to oldest. 

Use the checkbox on the top right of the card to indicate that this party (the party that has been checked) marks the end of the santa bag. You can move the cards to be in each santa bag as you see fit.

To reset the data you have to go in to the chrome dev tools (ctrl+shift+i) and click on "application" heading. Under "storage" click on "local storage" and click on "noddy.co.za" (or one of the other above urls depending on what domain you are on). On the right of that click on the item called "noddyState" and the click the "X" above it to delete it. NB! Do this only when you are done with the event. This cannot be undone.

## Developer README

Stack:
ReactJS
NextJS
Wordpress


App hosted on Vercel. WP admin hosted on Maverick Labs (production) and Freddiescomputekingdom (staging) google compute servers.

### Wordpress and php

Email parents plugin requires webpack build (run this from /Noddy/WP_plugins/components folder) :

`npx webpack --config webpack.config.jsx ./src/fetch_emails.js -o ../email-parents/includes/fetch_emails.js  --mode production`

To upload plugin files to WP server (these need to be pushed to staging (noddy-dev) and prod (noddy)):

`sudo gcloud compute scp --recurse ../email-parents noddy-dev:/var/www/html/wordpress/wp-content/plugins/ --zone us-central1-a`

`sudo gcloud compute scp ./WP_plugins/event-api-plugin.php  noddy-dev:/var/www/html/wordpress/wp-content/plugins/event-api-plugin --zone us-central1-a`

As state this needs to be done for both staging and prod. For this, you must log in to both, set the right project and set the right host name:

prod: `gcloud auth login freddieodonnell@gmail.com` or staging: `gcloud auth login freddiescomputekingdom@gmail.com`
prod: `gcloud config set project dex-m-5ad68`or staging: `gcloud config set project noddy-285919`
in the above `scp` commands hostnames are prod: `noddy` or staging: `noddy-dev`

env vars for php files are on the google compute insance in `/etc/php/7.3/fpm/pool.d/www.conf` eg `env['RECAPTCHA_SECRET']=...`. Once this file is updated restart php-fpm

`sudo systemctl restart php7.3-fpm.service`

For this to take effect I had to `set clear_env=no`

Error logs in `/var/www/html/wordpress/wp-content`

### Reactjs/Nextjs

Noddy FE is hosted on vercel https://vercel.com/dashboard (on Freddie's personal account)

Staging: noddy-dev.vercel.app. Admin noddy.m4v.co.za/wp-admin (passwords were sent out to RT members)
Production: noddy.co.za and noddy.vercel.app. Admin noddy.prod.m4v.co.za/wp-admin (same as dev passwords)

The admin domains are on Maverick Labs' dnsmade easy account. `noddy.co.za`domain is with Yoan: webmaster@estart.co.za

To deploy to production simply push to master branch. To deploy to Staging push to develop branch

Check vercel for env vars such as WP_AUTH_TOKEN

Email env vars are in `/var/www/html/wordpress/wp-config.php`

### Google Cloud Platform

Production noddy is held with maverick labs as an f1 micro vm. Development is held on Freddie's personal GCP account. Ask both for access. 

Google recaptcha keys are kept on Freddie's account https://www.google.com/recaptcha/admin/site/432840384/settings. Certificates were generated by certbot

#### vm migration debrief

If for whatever reason you need to migrate VMs between project; To migrate a vm from one project to another, first you must grant your user access to the noddy project (if you dont have access to the Noddy project ask freddie or Emma (m4verick labs)). Then assign the service role `service account user` role to the right service account. In this case I had to assign this role to `19446431913-compute@developer.gserviceaccount.com`. Then assign `Compute Image User` role to your user. Create a machine image and create a VM instance using that machine imagine as below.

`gcloud beta compute instances create noddy --project=dex-m-5ad68 --zone us-central1-a --source-machine-image projects/noddy-285919/global/machineImages/noddy-2 --service-account 19446431913-compute@developer.gserviceaccount.com`

Because the image is the exact replicate, WP saves the site url in the database. In production to use the new url noddy.prod.co.za. first I dumped the database, did a find and replace of the old to new url and restored the database:

`mysqldump -u freddie -p --extended-insert=false --databases noddy > dbdump.txt`
`sed -i 's/noddy.m4v.co.za/noddy.prod.m4v.co.za/g' dbdump.txt`
`mysql -u freddie -p noddy < dbdump.txt`


### Misc

email provider:
https://app.sendgrid.com/settings/sender_auth

Cloud service provider:
Google compute engine (freddiescomputekingdom and maverick labs) - if you need access contact me.

stack:
Wordpress + nextjs + reactjs + nginx

