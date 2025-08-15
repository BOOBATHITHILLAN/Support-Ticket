# Support Ticket App

A responsive full-stack web application where users can raise, view, and update support tickets — optimized for a mobile-first experience.

---

## 📌 Features

- **Login Page** (mock authentication, no real backend auth required)
- **Create Ticket**  
  - Fields: Title, Description, Priority dropdown
- **View Tickets**  
  - List/Table with "Update Status" button
- **State Management** with Redux (Redux Toolkit + Thunk)
- **Mobile-First Design** using Tailwind CSS
- **Full-Stack Setup** with PostgreSQL + Express.js + Prisma ORM

---

## 🛠 Tech Stack

### **Frontend**
- **React.js** (Vite setup)
- **Tailwind CSS** for responsive design
- **Redux Toolkit** with Thunk for state management
- **Axios** for API calls
- **React Router DOM** for navigation

### **Backend**
- **Node.js + Express.js**
- **Prisma ORM** for database access
- **PostgreSQL** as the database
- **CORS** & **Morgan** for middleware

---

## 🚀 Setup Instructions

### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/yourusername/support-ticket-app.git
cd support-ticket-app
2️⃣ Backend Setup
bash
Copy
Edit
cd backend
Install dependencies
bash
Copy
Edit
npm install
Configure .env
Create a .env file in the backend folder:

env
Copy
Edit
DATABASE_URL="postgresql://postgres:<password>@localhost:5432/support_ticket_app?schema=public"
PORT=5000
Start PostgreSQL locally (Windows)
powershell
Copy
Edit
& "C:\Program Files\PostgreSQL\17\bin\pg_ctl.exe" start -D "C:\Program Files\PostgreSQL\17\data"
Create the database
bash
Copy
Edit
npx prisma migrate dev --name init
Start backend
bash
Copy
Edit
npm run dev
3️⃣ Frontend Setup
bash
Copy
Edit
cd frontend
Create project using Vite
bash
Copy
Edit
npm create vite@latest frontend
# Select: React + TypeScript
Install dependencies
bash
Copy
Edit
npm install
Install Tailwind CSS
bash
Copy
Edit
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
Configure tailwind.config.js:

js
Copy
Edit
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
Start frontend
bash
Copy
Edit
npm run dev
📂 Project Structure
pgsql
Copy
Edit
support-ticket-app/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── prisma/
│   │   └── server.ts
│   ├── prisma/schema.prisma
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   └── App.tsx
│   ├── index.html
│   └── package.json