'use strict';
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');
require('dotenv').config();

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  VUE_APP_FIREBASE_API_KEY: JSON.stringify(process.env.FIREBASE_API_KEY),
  VUE_APP_FIREBASE_AUTH_DOMAIN: JSON.stringify(
    process.env.FIREBASE_AUTH_DOMAIN
  ),
  VUE_APP_FIREBASE_DB_URL: JSON.stringify(process.env.FIREBASE_DB_URL_PROD),
  VUE_APP_FIREBASE_PROJECT_ID: JSON.stringify(process.env.FIREBASE_PROJECT_ID),
  VUE_APP_FIREBASE_STORAGE_BUCKET: JSON.stringify(
    process.env.FIREBASE_STORAGE_BUCKET
  )
});
