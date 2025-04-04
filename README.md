# MERN stack accommodations booking web app

This is a repository for Stay which is MERN stack accommodations booking web app

## 🛠 Tech Stack

### **Frontend:**

- React, Vite, TypeScript, Tailwind CSS, React Query, Axios, React Context API

### **Backend:**

- Node.js, Express, TypeScript, MongoDB, Prisma ORM, Stripe API, Google OAuth, Cloudinary for image uploads, JSON Web Token (JWT) Authentication

## 🚀 Features

- 🔑 **Authentication & Authorization** – Google OAuth and JWT authentication.
- 🏠 **Browse & Book Stays** – Search accommodations, view details, and book instantly.
- 💳 **Secure Payments** – Integrated **Stripe API** for smooth transactions.(Stripe test card 4242 4242 4242 4242 12/34 567)
- 🛠 **Business account** – Business users manage accommodations(etc. post, edit delete accommodations)
- 📂 **Image Uploads** – Uses **Cloudinary** for image storage.
- 📊 **Optimized Data Fetching** – Implemented **React Query** for efficient state management.

### Install packages

```shell
npm install --legacy-peer-deps or --force
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
