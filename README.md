# Smart Task Manager

## Project Overview

Smart Task Manager is a full-stack task management application that allows users to securely manage their personal tasks through a modern web interface.

The application provides JWT-based authentication, task creation, updating, deletion, searching, and status tracking while demonstrating a production-oriented architecture using FastAPI, React, TypeScript, and PostgreSQL.

This project was built to strengthen practical full-stack development skills, REST API design, authentication, database integration, and modern frontend development.

## Features

- User Registration
- Secure JWT Authentication
- Password Hashing using bcrypt
- Create Tasks
- Update Tasks
- Delete Tasks
- Search Tasks
- Task Status Management
- Responsive UI using Tailwind CSS
- Toast Notifications
- Loading States
- Client-side Form Validation
- Environment Variable Configuration

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios
- Sonner
- Lucide React

### Backend

- FastAPI
- SQLAlchemy 2.0
- PostgreSQL
- Pydantic
- JWT Authentication
- Passlib (bcrypt)

### Tools

- Git
- GitHub
- Swagger UI


## Project Structure

```text
smart-task-manager/
├── app/
│   ├── models/
│   ├── routers/
│   ├── schemas/
│   ├── database.py
│   ├── security.py
│   └── main.py
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   └── types/
│   └── package.json
│
└── README.md
```

## Installation

### Clone the repository

```bash
git clone https://github.com/22F1000765/smart-task-manager.git
cd smart-task-manager
```

### Backend Setup

```bash
cd app

python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

## Environment Variables

### Backend (.env)

```env
DATABASE_URL=your_database_url
SECRET_KEY=your_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

### Frontend (.env)

```env
VITE_API_URL=http://127.0.0.1:8000
```

## API Documentation

Once the backend server is running, interactive API documentation is available at:

```
http://127.0.0.1:8000/docs
```

Swagger UI can be used to test all endpoints, including authentication and task management APIs.

## Future Improvements

- Deploy backend using Render
- Deploy frontend using Vercel
- Host PostgreSQL on Neon
- Add Alembic database migrations
- Add Docker support
- Implement CI/CD using GitHub Actions
- Add unit and integration testing
- Add task filtering and pagination enhancements

## Author

**N. M. Pranitha**

- GitHub: https://github.com/22F1000765
- LinkedIn: https://linkedin.com/in/n-m-pranitha-36a590226