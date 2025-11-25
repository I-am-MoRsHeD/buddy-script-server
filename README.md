
# 🧠 Buddy Script App — Backend (Node + Express + MongoDB)

A scalable REST API backend for Buddy Script App providing secure user access, post/comment/reply.
---

## 🚀 Features

### 🔐 Authentication
- Register & Login with JWT
- Protected routes with role-based access

---

## 🛠️ Tech Stack

| Technology | Use |
|-----------|-----|
| **Node.js + Express** | Server |
| **MongoDB + Mongoose** | Database |
| **JWT** | Authentication |
| **Zod** | Validation |
| **Bcrypt** | Password security |

---

## 🔐 Environment Variables

Create a `.env` file in the root:

```env

# Server
PORT="5000"
NODE_ENV="development"
MONGO_URL=your_database_url

#bcryptjs
BCRYPT_SALT_ROUNDS=bcrypt_salt_rounds

FRONTEND_URL=your_frontend_url

#Cloudinary
CLOUDINARY_CLOUD_NAME=name
CLOUDINARY_API_KEY=api_key
CLOUDINARY_API_SECRET=api_secret

#jwt
JWT_ACCESS_SECRET=access_token_secret
JWT_ACCESS_EXPIRES=days
JWT_REFRESH_SECRET=refresh_token_secret
JWT_REFRESH_EXPIRES=days

```


