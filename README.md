<div align="center">

# 🍔 Partiu Burguer — Dashboard

**A web dashboard for managing restaurant menu items and orders.**

Built with React and FastAPI, the application provides tools to create menu items, manage orders, and securely access the dashboard.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Python](https://img.shields.io/badge/Python-3-3776AB?logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-API-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Redis](https://img.shields.io/badge/Redis-Cache%20and%20sessions-DC382D?logo=redis&logoColor=white)](https://redis.io/)

<br />

<img src="https://skillicons.dev/icons?i=react,js,vite,tailwind,python,fastapi,postgres,redis" alt="Technologies: React, JavaScript, Vite, Tailwind CSS, Python, FastAPI, PostgreSQL, Redis" />

</div>

---

## About

Partiu Burguer is a restaurant management dashboard with a React frontend and a Python API. It supports creating menu items with image uploads, viewing and managing orders, and protecting dashboard actions with email verification.

> **Project status:** In development. Features, setup instructions, and configuration may change.

## Features

- Create menu items with a name, description, price, category, and image.
- View orders and update their status.
- Delete orders.
- Protect dashboard operations with email verification and cookie-based authorization.
- Store order data in PostgreSQL and temporary verification and authorization data in Redis.
- Upload menu images through ImgBB.
- Configure allowed frontend origins for the API using CORS.

## Technology stack

| Area | Technologies |
| --- | --- |
| Frontend | React 19, JavaScript, Vite, Tailwind CSS 4 |
| Backend | Python, FastAPI, Uvicorn |
| Database | PostgreSQL (`psycopg2`) |
| Cache and temporary authorization data | Redis |
| Integrations | ImgBB image hosting, Mailjet email delivery |
| Tooling | pnpm, Oxlint |

## Project structure

```text
.
├── API/
│   ├── Databases/       # PostgreSQL and Redis connections and database setup
│   ├── Middlewares/     # Authentication middleware
│   ├── Routers/         # Order and authorization endpoints
│   ├── Schemas/         # API request schemas
│   ├── Services/        # External services, including email
│   ├── Verification/    # Verification code handling
│   ├── main.py          # FastAPI application
│   └── requirements.txt
├── public/              # Static frontend assets
├── src/
│   ├── Components/      # React UI components
│   ├── Requisitions/    # Frontend API requests
│   └── StylesGlobals/   # Global styles
├── index.html
├── package.json
├── pnpm-lock.yaml
└── vite.config.js
```

## Requirements

- Node.js and [pnpm](https://pnpm.io/)
- Python 3
- A PostgreSQL database
- A Redis instance
- ImgBB API key and Mailjet credentials for image uploads and email verification

## Getting started

Clone the repository and install the frontend dependencies:

```bash
git clone https://github.com/joaopedro236/Dashboard-Partiu-Burguer-.git
cd Dashboard-Partiu-Burguer-
pnpm install
```

### Configure environment variables

Create a `.env` file in the repository root. Set the values for your own services and credentials:

```dotenv
# Frontend URL allowed to make credentialed requests to the API
FRONTEND_URLS=http://localhost:5173

# API URL used by the Vite frontend
VITE_API_URL=http://localhost:8000

# PostgreSQL connection settings
# Note: the application currently uses the variable name db_post_Order.
db_host_Order=localhost
db_post_Order=5432
db_database_Order=partiu_burguer
db_user_Order=your_database_user
db_password_Order=your_database_password

# Redis connection URL (use rediss:// for TLS connections)
REDIS_URL=redis://localhost:6379/0

# ImgBB API key used for menu image uploads
IMGBB_URL=your_imgbb_api_key

# Mailjet credentials used for email verification
MAILJET_API_KEY=your_mailjet_api_key
MAILJET_SECRET_KEY=your_mailjet_secret_key
MAILJET_SENDER=verified-sender@example.com
Authorized_Email=dashboard-owner@example.com
```

Do not commit real credentials or production secrets. Use the actual frontend URL in `FRONTEND_URLS`; multiple origins can be comma-separated. The frontend and API both read this root `.env` file through Vite and `python-dotenv` respectively.

### Start the frontend

```bash
pnpm dev
```

Vite prints the local development URL in the terminal (typically `http://localhost:5173`). Make sure `VITE_API_URL` points to the running API.

### Start the API

Create and activate a Python virtual environment from the repository root:

```bash
python -m venv .venv
```

macOS/Linux:

```bash
source .venv/bin/activate
```

Windows PowerShell:

```powershell
.venv\Scripts\Activate.ps1
```

Install the API dependencies and run the development server:

```bash
pip install -r API/requirements.txt
uvicorn API.main:app --reload
```

The API uses the PostgreSQL and Redis settings from `.env`. The database table is initialized when the API starts. The application currently disables the built-in `/docs`, `/redoc`, and `/openapi.json` routes.

## Available frontend scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the Vite development server |
| `pnpm build` | Create a production build |
| `pnpm preview` | Preview the production build locally |
| `pnpm lint` | Run Oxlint |

## API capabilities

The API currently includes routes for:

- Creating menu items (`POST /createOrder`)
- Retrieving orders (`GET /getOrder`)
- Changing an order's status (`POST /changeStateOrder`)
- Deleting orders (`DELETE /deleteOrder`)
- Checking authorization (`GET /authorization`)
- Sending and validating email verification codes (`POST /send-verification`, `POST /verify-code`)

All endpoints other than the authorization and verification flow require a valid authorization cookie. Refer to the router files in `API/Routers/` for the request formats and current behavior.

## Contributing

Contributions, suggestions, and bug reports are welcome. Open an issue to discuss a change or submit a pull request. Since the project is under active development, consider checking existing issues before starting larger changes.

## License

No license has been specified for this repository yet. Contact the repository owner before redistributing or reusing the project.
