# Employee Management System

This project is built using React, Spring Boot, and PostgreSQL as part of the technical assessment.

## Features

- Admin login using HTTP Basic authentication.
- Department dropdown to select a department.
- Displays employees based on the selected department.
- Caches department data to reduce database calls.
- REST APIs to get departments and employees.

## Technologies Used

- **Frontend:** React, JavaScript
- **Backend:** Java 21, Spring Boot
- **Database:** PostgreSQL
- **DevOps:** Docker, GitHub Actions, AWS ECR, Kubernetes (EKS)

## Project Structure

- `frontend/` - React application
- `backend/` - Spring Boot application
- `backend/database/init.sql` - Database setup and sample data
- `k8s/` - Kubernetes deployment and autoscaling files
- `.github/workflows/` - CI/CD workflow

## How to Run Locally

**1. Database**

Create a PostgreSQL database named `employee_db` and run:

```bash
psql -d employee_db -f backend/database/init.sql
```

**2. Backend**

Set the environment variables:

```bash
export DB_USERNAME=your_username
export DB_PASSWORD=your_password
export APP_PASSWORD=admin
```

Start the backend:

```bash
cd backend
mvn spring-boot:run
```

**3. Frontend**

Open a new terminal and run:

```bash
cd frontend
npm install
npm run dev
```

Open the URL shown in the terminal.

**Login for local testing:** `admin / admin`

## API Endpoints

| Method | Endpoint                        | Description                 |
| ------ | ------------------------------- | --------------------------- |
| GET    | `/api/departments`              | Get all departments         |
| GET    | `/api/employees?departmentId=1` | Get employees by department |

Both APIs use HTTP Basic authentication.

## CI/CD and AWS

GitHub Actions builds the frontend and backend and pushes Docker images to Amazon ECR.

Kubernetes deployment files are added for the frontend, backend, and Horizontal Pod Autoscaler (HPA).
