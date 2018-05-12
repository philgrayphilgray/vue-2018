require('dotenv').config();

module.exports = {
  NODE_ENV: '"production"',
  VUE_APP_FIREBASE_API_KEY: JSON.stringify(process.env.FIREBASE_API_KEY_PROD),
  VUE_APP_FIREBASE_AUTH_DOMAIN: JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN_PROD),
  VUE_APP_FIREBASE_DB_URL: JSON.stringify(process.env.FIREBASE_DB_URL_PROD),
  VUE_APP_FIREBASE_PROJECT_ID: JSON.stringify(process.env.FIREBASE_PROJECT_ID_PROD),
  VUE_APP_FIREBASE_STORAGE_BUCKET: JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET_PROD),
};
