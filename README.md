# graphql-typescript-stripe-example

An example project of how to use Stripe with GraphQL and Typescript

YouTube Playlist: https://www.youtube.com/playlist?list=PLN3n1USn4xllF5t1GZhEwFQNDnStgupdB

0. Architecture
1. Server
1. Frontend
1. Stripe checkout and sign user up for subcription
1. How to handle free trials
1. Nav bar
1. Change credit card
1. Cancel or resubscribe
1. Styled Components

![stripe-diagram](https://raw.githubusercontent.com/benawad/graphql-typescript-stripe-example/master/stripe-diagram.png)

## Getting started

- Ensure Docker client is up and running locally
- Ensure you have a Stripe account or create one

### Stripe account

- If you don't have a Stripe account: [Register](https://dashboard.stripe.com/register)
- If you have a Stripe account: [Login](https://dashboard.stripe.com/login)

You might well get a confirmation email. Be sure to click the _confirmation link_

Then you might well need to activate your account by providing additional information [here](https://dashboard.stripe.com/account/details)

Go to [developers section](https://dashboard.stripe.com/test/developers)
Optionally upgrade the API version.

Go to [API keys](https://dashboard.stripe.com/account/apikeys)
Click display secret key and make it available to your app in a safe way.

Add the keys and other configurations to your app via Enviroment variables:

- `process.env.STRIPE_SECRET`
- `process.env.PLAN`
- `process.env.REACT_APP_STRIPE_PUBLISHABLE` stripe key
- `process.env.PUBLIC_URL`

A good option is to use [dotenv](https://github.com/motdotla/dotenv) which is also used in this project by default:

- `.env.local`
- `.env.development.local`
- `.env.test.local`
- `.env.production.local`

For plans, see [products-and-plans](https://stripe.com/docs/billing/subscriptions/products-and-plans)

```txt
STRIPE_SECRET=abc123
PLAN=plan123
PUBLIC_URL=https://xyz.com
REACT_APP_STRIPE_PUBLISHABLE=key123
```

### Server

#### Prepare server

```bash
$ cd server
$ yarn install
```

#### Start server

`$ docker-compose up`

#### Trouble shooting

In case you get:

```bash
$ docker-compose up
Pulling db (postgres:)...
ERROR: Get https://registry-1.docker.io/v2/library/postgres/manifests/latest: unauthorized: incorrect username or password
```

Try this:

```bash
$ docker login
Authenticating with existing credentials...
Stored credentials invalid or expired
Login with your Docker ID to push and pull images from Docker Hub. If you don't have a Docker ID, head over to https://hub.docker.com to create one.
Username (xyz@gmail.com): xyz
Password: *******
Login Succeeded
```

Then `docker-compose up` should work ;)

Except you will get:

```bash
Pulling web (stripe-example-multi-stage:)...
ERROR: The image for the service you're trying to recreate has been removed. If you continue, volume data could be lost. Consider backing up your data before continuing
```

So you will have to create and push your own image ;) (see video tutorial)

### Web app

- prepare
- start

####Prepare web app

```
$ cd ..
$ cd web
$ yarn install
```

#### Start web app

```bash
$ yarn start
Compiled successfully!

You can now view web in the browser.

  Local:            http://localhost:3000/
  On Your Network:  http://192.168.0.32:3000/

Note that the development build is not optimized.
To create a production build, use yarn build.
```

## Testing Stripe checkout

See [Stripe Testing](https://stripe.com/docs/testing)

Go to [Testing cards](https://stripe.com/docs/testing#cards) and use the cards there on the Stripe checkout page for the React app.
