# 🚀 Shopify x Next.js App Template for serverless non-embedded Apps

Everything to build your next non-embedded Shopify App using NextJS.
This Template utilizes Middleware and APIs for OAuth, so no custom server is needed.

Intentionally barebones. 🦴
Updated to Shopify API 2023-07

## Table of Contents

- 🤩 Features
- 👀 Requirements
- 🚀 Getting Started
- 👨‍💻 Authors & Contributors
- 🧰 Built with

## 🤩 Features

- ⚡ Next.js - React Framework for static rendering
- ✨ Serverless Architecture
- 💳 App Subscrptions
- 💾 Session Storage with Redis
- 🚇 Ngrok for development
- 🚀 Apollo/Client
- 🪝 Webhooks set up

## 👀 Requirements

- Shopify Partner Account
- Shopify Dev Store
- Ngrok account
- Upstash Redis Database

## 🚀 Getting Started

- Click `Use this template` or [this link](https://github.com/AndrejMazhenkovski/shopify-nextjs-non-embedded-app/generate)
- Create an App in your Shopify Partner Account
  - Set https://localhost as the App Url for now
  - Go to `App Setup` -> `Embedded app` and disable `Embed your app in Shopify admin`
  - Select App Distribution to "Public" (if you need the billing API for subscriptions)
- Fill out your `.env` file
  - `SHOPIFY_API_KEY`: The Shopify Api key of the app, you have just created
  - `SHOPIFY_API_SECRET_KEY`: The Shopify Api secret key of the app, you have just created
  - `SCOPES`: The [access scopes](https://shopify.dev/api/usage/access-scopes) your app needs
  - `HOST`: The Url of your app. Leave this empty for development
  - `SHOP`: Your dev stores url
  - `NGROK_AUTH_TOKEN`: Your [Ngrok auth token](https://dashboard.ngrok.com/get-started/your-authtoken)
  - `UPSTASH_REDIS_REST_URL`: Your Upstash Redis REST url.
  - `UPSTASH_REDIS_REST_TOKEN`: Your Upstash Redis REST token.
- Run `ngrok http 3000` in terminal and use the URL inside app setup and your .env
- Run `npm install`
- Run `npm run shopify app config link` to link the repo with your Shopify App in Partners Dashboard (function creates app.toml file, which is needed for your app to function)
- Run `npm run dev`

- Visit `https://{YOUR_APP_URL}/login` to install your app

## 👨‍💻 Authors & Contributors

The original author of this code is [@carstenlebek](https://github.com/carstenlebek).
Updated & Maintained by [@andrejmazhenkovski](https://github.com/AndrejMazhenkovski)
Pull requests are open!

When I launched my Shopify app [Notifeed](https://apps.shopify.com/notifeed) using Carsten's original repository, I encountered issues that were also noted by Shopify. Despite opening a pull request and submitting issues, there was no response for over a year, so I've created this soft fork to continue maintenance and improvements over the original repository

#### Updates and Improvements over the original

Since the inception of this soft fork, the first order of business was to update the shopify-api, as it was using an outdated version 3.0.4. Now updated to 7.6.0 (2023-07).

Fixed a bug where the app would load, but not install to the store, shortly after you uninstall it.
Fixed a major bug that would not allow switching of apps between multiple stores on the same browser session.

Improved webhooks with callback handler configuration.

Migrated to CLI 3.0 (use `npm run shopify app`, and check other scripts in package.json)

## 🧰 Built with

- [Next.js](https://nextjs.org/)
- [@shopify/shopify-api](https://github.com/Shopify/shopify-node-api)
- [@apollo/client](https://www.apollographql.com/docs/react/)
