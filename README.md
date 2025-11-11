# Backend KPI Lab 4

**Author:** Oleksandr Rodina, group IM-33

**My group number: 33**

**Variant for lab3: 33 % 3 = 0 \(Облік доходів\)**

**Every lab builds on the previous one**

**Deployed version:** [LINK](https://backend-kpi-lab4.onrender.com/healthcheck)

## Requirements

- **Node.js** (v18.x or higher)
- **Docker**
- **Docker Compose**

## Environment Variables

This project uses environment variables for configuratSion. You need to create a `.env` file in the root of the project.

The file should contain the following variables:

`PORT`: The port on which the application server will run.
`DATABASE_URL`: URL to your database.
`JWT_SECRET`: Your secret JWT key.
`JWT_EXPIRES_IN`: "Time after which your JWT key is expried.

```
PORT=8000
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d
```

**Default PORT is 3000 if not set in `.env` file**

## Setup and Usage

### 1. Clone the repository

```bash
git clone <repo_url>
cd <repo_name>
```

### 2. Choose a way to run the application

#### Option A: Running Locally (without Docker)

```bash
# Install dependencies
npm install

# Start the server
npm start
```

The application will be available at `http://localhost:PORT` (where `PORT` is the value from your `.env` file, e.g., `http://localhost:8000`).

---

#### Option B: Running with Docker

```bash
# 1. Build the Docker image
sudo docker build -t api:latest .

# 2. Run the container
# -e PORT=8000   : Passes the PORT environment variable to the container
sudo docker run -it --rm --network=host -e PORT=8000 api:latest
```

The application will be available at `http://localhost:8000`.

---

#### Option C: Running with Docker Compose

```bash
sudo docker compose up
```

_For older versions, you might need the command with a hyphen:_

```bash
sudo docker-compose up
```

### Health Check

After starting the application using any of the methods, you can check if the service is running correctly by accessing the healthcheck endpoint:

`http://localhost:PORT/healthcheck`
