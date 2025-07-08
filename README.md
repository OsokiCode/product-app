# Product App

A simple web application that displays real-time gold prices and calculates the value of products using popularityScore and weight metrics, reflecting these values dynamically.

---

## Project Structure

- `product-frontend/` → User interface built with React and Vite  
- `product-backend/` → Node.js based REST API

---

## Getting Started (Running Locally)

To run the project on your local machine:

1. Clone this repository:

```bash
git clone https://github.com/OsokiCode/product-app.git

Navigate to the backend and frontend folders separately and install dependencies:

cd product-backend
npm install
cd ../product-frontend
npm install

Create a .env file inside the product-backend folder and add your API key in the following format:

GOLD_API_KEY=your_api_key_here

Run backend and frontend in separate terminal windows:

# Backend
cd product-backend
npm start

# In a new terminal, run frontend
cd product-frontend
npm run dev