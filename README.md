# Real Estate AI Tool

## Overview
The **Real Estate AI Tool** is designed to help real estate professionals manage and market property listings with AI-powered automation. It allows users to fetch property listings, edit details, select images, and generate social media posts effortlessly. The frontend is built using **React.js with Chakra UI**, while the backend runs on **FastAPI**.

## Features
- Fetch property listings from a backend API.
- Edit property details such as price, address, bedrooms, and bathrooms.
- Select images for social media posts with AI-enhanced automation.
- Responsive UI with Chakra UI for a seamless user experience.
- Easy-to-use search functionality for pasting listing URLs.

## Installation and Setup

### **Backend Setup**
1. Navigate to the `src` directory:
   ```sh
   cd src
   ```
2. Run the FastAPI server with Uvicorn:
   ```sh
   python3.13 -m uvicorn App:app --host 0.0.0.0 --port 8000 --reload
   ```
3. The backend will start on `http://127.0.0.1:8000`.
4. If using an ngrok domain open terminal and type ngrok http 8000 --host-header="localhost:8000"

### **Frontend Setup**
1. Navigate to the frontend directory:
   ```sh
   cd src/frontend
   ```
2. Install dependencies (if not installed):
   ```sh
   npm install
   ```
3. Start the React development server:
   ```sh
   npm start
   ```
4. The frontend will start on `http://localhost:3000`.

## Git Setup and Push to GitHub
