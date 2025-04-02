# MERN stack accommodations booking web app

This is a repository for Stay which is MERN stack accommodations booking web app
Frontend stack - React, Vite, Typescirpt, Tailwind CSS, React Context Api, react-query, axios
Backend stack - Node.js, Express, Typescript, Stripe, MongoDB, PrismaORM, Google-oauth, Cloudinary, jsonwebtoken

### Install packages

```shell
npm istall --legacy-peer-deps or --force
```

### Setup .env file

```js
Frontend

VITE_API_BASE_URL=

# Google
VITE_GOOGLE_CLIENT_ID=

# Stripe
VITE_STRIPE_PUB_KEY=

Backend

DATABASE_URL="mongodb+srv://test:test1234@cluster0.16cdc.mongodb.net/stay"

CLIENT_URL=

JWT_SECRET_KEY=

# Google
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Cloudinary
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Stripe
STRIPE_API_KEY=
```

### Start the app

```shell
npm run dev
```
