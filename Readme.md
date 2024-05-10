# React Phantom Wallet Connector

This project is a React application that allows users to connect their Phantom wallet for authentication.

## Features

- Connect Phantom Wallet.
- Sign a message using Phantom Wallet.
- Send the signature to the backend server for validation.
- On successful validation, wallet's public address is displayed.

## Prerequisites

- Node.js and npm: You will need Node.js and npm installed to run this project. You can download them [here](https://nodejs.org/en/download/).
- Python and django: You will need Python and Django for backend server.
- Phantom wallet extension installed on the user's browser.

## Configuration

Configuration is managed with environment variables. Two environment variables are required:

- `REACT_APP_FRONTEND_URL`: The URL of your frontend server (e.g., "http://localhost:3000").
- `REACT_APP_BACKEND_URL`: The URL of your backend server (e.g., "http://localhost:8000").

These are set in the `.env` file at the root of the project.

**Please make sure to not expose your `.env` file on public repositories**

## Installation

### Frontend

To install the dependencies of the project, run the following command:

```bash
cd frontend
npm install
```

Afther install all packages for frontend you can run your frontend:

```bash
npm start
```

### Backend

To install the dependencies and run the backend server, run the following command:

```bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```
