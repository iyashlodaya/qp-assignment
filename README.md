### **README.md**

# Backend Assignment

## Overview

This project is a backend API built with **Express** and **TypeScript**. It provides both admin and user APIs. The application is containerized using **Docker** for easy deployment and scalability. The database is automatically created and initialized using Docker Compose.

## Prerequisites

Ensure the following tools are installed on your machine:

- **Docker**: [Install Docker](https://www.docker.com/get-started)

- **Docker Compose**: [Install Docker Compose](https://docs.docker.com/compose/install/)

## Setup Instructions

### **1. Clone the Repository**

Clone the repository to your local machine:

```bash
git clone https://github.com/iyashlodaya/qp-assignment.git
cd qp-assignment
```

### **2.Set up environment variables** 

Create a .env file in the root directory of the project and add the following content:

DB_NAME=your_db_name
DB_USER=your_db_username
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=5432
DB_DIALECT=postgres
JWT_SECRET_KEY=qp-assignment


### **3. Build Docker Images**

To build the Docker images for the application and PostgreSQL database, run the following command:

```bash
docker-compose build
```

This command will download the necessary Docker images and build the application container along with its dependencies.

### **3. Start the Application**

Once the images are built, you can start the application along with the PostgreSQL database using Docker Compose:

```bash
docker-compose up
```

This will start the backend and database services. The application will be accessible at `http://localhost:3000`.

**Note**: Docker Compose automatically creates and starts both the backend and the database containers, as well as initializes the database with the necessary schema.

### **4. Database Initialization**

The PostgreSQL database will be automatically created and initialized with necessary tables when you run the `docker-compose up` command. 

- **Username**: `your_db_username`
- **Password**: `your_db_password`
- **Database Name**: `your_db_name`
  
You can connect to the database using any PostgreSQL client (pgAdmin, DBeaver, etc.) or the `psql` command-line tool.

### **5. Verify the Setup**

Once the containers are up and running, you can make HTTP requests to the available API endpoints to verify that everything is functioning properly. For example, using **Postman** or **cURL**, you can make a request to the backend:

Test API ->

```bash
curl http://localhost:3000/api/user/test
```

### **6. Stopping the Application**

To stop and remove the containers, use the following command:

```bash
docker-compose down
```

This will stop all running containers and clean up any resources.

## Docker Compose Details

The `docker-compose.yml` file configures the following services:

- **Backend**: Runs the Express API server and connects to the PostgreSQL database.
- **Database (PostgreSQL)**: Provides the database service.