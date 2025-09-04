# School Management System

A full-stack **School Management System** built with **Next.js 14 (App Router)**, **MySQL (Aiven Cloud)**, and **Vercel Blob Storage**.  
This project allows adding and viewing schools with details like name, address, contact, state, and images.

---

## Features

- Add new schools with details (name, address, city, state, contact, email, image).
- Display all schools in a responsive grid.
- Image uploads using **Vercel Blob Storage**.
- MySQL database hosted on **Aiven Cloud**.
- Secure SSL connection with DB (self-signed cert handling).
- Deployed on **Vercel**.

---

## Tech Stack

- **Frontend**: Next.js 14 (App Router) + TailwindCSS
- **Database**: MySQL (Aiven Cloud)
- **File Storage**: Vercel Blob Storage
- **UI Components**: ShadCN + Lucide Icons

---

## Project Structure

```
app/
├── api/
│ └── schools/
│ └── route.js # API endpoints (GET, POST)
├── addSchool/ # Add School page
├── showSchools/ # Display Schools page
├── layout.js
└── page.js # Home page
lib/
└── db.js # MySQL connection pool
components/
└── ui/ # Reusable UI components
```

---

## Environment Variables

Create a `.env.local` file in the project root:

```env
# MySQL (Aiven)
DB_HOST=mysql-xxxxxx-moderncoe-xxx.aivencloud.com
DB_PORT=28454
DB_USER=avnadmin
DB_PASSWORD=your-db-password
DB_NAME=defaultdb

# SSL Certificate (base64 encoded PEM)
DB_CA=MIIC....<your-base64-encoded-cert>....Q==

# Vercel Blob Storage
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxxxxxxxxxxxxxxxx
```

## Setup Instructions

#### 1. Clone Repo

```
git clone https://github.com/your-username/school-management-system.git
cd school-management-system
```

#### 2. Install Dependencies

```
npm install
```

#### 3. Setup Database

- Import the schema into MySQL:

```
CREATE TABLE schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ...
);
```

#### 4. Run Locally

```
npm run dev
```

App will be available at → http://localhost:3000

#### 4. Deploy on Vercel

- Push code to GitHub.

- Import repo in Vercel

- Add all environment variables in Vercel dashboard.

- Deploy

## Author

`Karan Suryawanshi`

## License

This project is licensed under the MIT License.
