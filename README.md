# videoUploader
A minimal video-sharing demo with:

- **Backend**: Node.js + Express + MongoDB + Cloudinary + JWT  
- **Frontend**: React + Axios + React Router  

Built to showcase core STRMLY features: user signup/login, video upload, public feed.

---

## 📂 Project Structure
├── .env ← Environment variables
│ ├── package.json
│ ├── server.js
│ └── src/
│ ├── config/
│ │ └── cloudinary.js
│ ├── controllers/
│ │ ├── auth.controller.js
│ │ └── videos.controller.js
│ ├── middleware/
│ │ ├── auth.js
│ │ ├── rateLimiter.js
│ │ └── errorHandler.js
│ ├── models/
│ │ ├── User.js
│ │ └── Video.js
│ └── routes/
│ ├── auth.routes.js
│ └── video.routes.js
└── strmly-frontend/ ← React client
├── .env ← Environment variables
├── package.json
└── src/
├── api/
│ └── api.js
├── pages/
│ ├── Signup.js
│ ├── Login.js
│ ├── Upload.js
│ └── Feed.js
├── pages/*.css ← component-specific styling
├── App.js
└── index.js

## 🚀 Features

- **User Authentication**  
  - Sign up (`POST /api/auth/signup`)  
  - Log in (`POST /api/auth/login`) with JWT  
  - Get profile (`GET /api/auth/profile`)
- **Video Upload**  
  - Upload MP4 to Cloudinary (`POST /api/videos/upload`)
  - Metadata stored in MongoDB
- **Public Feed**  
  - List all videos, sorted newest‐first (`GET /api/videos`)
- **Security & Optimization**  
  - Rate limiting (`express-rate-limit`)  
  - Basic headers protection (`helmet`)  
  - Validation (`Joi`)  
- **Frontend**  
  - React router for navigation  
  - Axios instance with token interceptor  
  - Responsive grid feed, upload & auth forms

---

## ⚙️ Prerequisites

- **Node.js** v14+ & **npm**
- **MongoDB** Atlas account (or local MongoDB)
- **Cloudinary** free account

---

## 🔧 Setup

### 1. Clone

``bash
git clone

step 1
cd strmly-backend
npm install

step 2 
PORT=4000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=a_strong_random_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

node server.js
# or: npx nodemon server.js

cd ../strmly-frontend
npm install

REACT_APP_API_URL=http://localhost:4000/api
npm start
| Method | Endpoint            | Body                         | Protected? | Description                |
| ------ | ------------------- | ---------------------------- | ---------- | -------------------------- |
| POST   | `/api/auth/signup`  | `{ name, email, password }`  | No         | Register a new user        |
| POST   | `/api/auth/login`   | `{ email, password }`        | No         | Log in & receive JWT       |
| GET    | `/api/auth/profile` | *–* (Bearer token in header) | Yes        | Get current user’s profile |

| Method | Endpoint             | Body (form-data)                | Protected? | Description                          |
| ------ | -------------------- | ------------------------------- | ---------- | ------------------------------------ |
| POST   | `/api/videos/upload` | `title`, `description`, `video` | Yes        | Upload MP4 to Cloudinary + save meta |
| GET    | `/api/videos`        | *–*                             | No         | List all videos (newest first)       |

# install deps
npm install
# run server
npm start      # if you add "start": "node server.js" in package.json
node server.js

npm install
npm start
npm run build

