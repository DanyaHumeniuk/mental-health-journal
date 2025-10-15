# 🧠 Mental Wellness Journal (Full-Stack MERN Application)

[**Click here to view the live demo on Vercel!**](https://mental-health-journal-psi.vercel.app)

## 🌟 Project Overview

The **Mental Wellness Journal** is a secure, full-stack journaling application built with the MERN stack (MongoDB, Express, React, Node.js). It provides users with a private, authenticated space to track and manage their thoughts and feelings. The project demonstrates proficiency in building robust RESTful APIs, securing routes with JWT, and developing a clean, modern user interface.

### Key Features

* **Secure Authentication Flow:** Implements user registration and login secured by **JSON Web Tokens (JWT)** and password hashing with **bcrypt**.
* **Seamless Onboarding:** Users are automatically logged in and redirected to the dashboard upon successful registration, minimizing friction.
* **Full CRUD Functionality:** Users can **C**reate, **R**ead, **U**pdate, and **D**elete their private journal entries from a single, intuitive dashboard.
* **Modular Architecture:** Clean separation of concerns with dedicated frontend and backend directories, promoting maintainability.
* **Modern UI/UX:** Built with **React** and styled using **Tailwind CSS** for a responsive and accessible design.
* **AI Integration Ready (Next Step):** Configured to easily integrate the **Google Gemini API** for future supportive analysis and actionable wellness recommendations.

---

## 🛠️ Technology Stack

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | React (via Vite) | Component-based UI and fast development environment. |
| **Styling** | Tailwind CSS | Utility-first framework for rapid, responsive, and maintainable styling. |
| **Backend** | Node.js, Express | Non-blocking, event-driven server environment for the REST API. |
| **Database** | MongoDB, Mongoose | Flexible NoSQL database and Object Data Modeling (ODM) library. |
| **Security** | JWT, bcryptjs | Securing routes and hashing user passwords. |
| **HTTP** | Axios | Promise-based client for clean API communication. |

---

## 🚀 Getting Started

Follow these instructions to set up and run both the frontend and backend components locally.

### Prerequisites

* Node.js (v18+) and npm
* MongoDB (A local instance or a cloud service like MongoDB Atlas)

### 1. Backend Setup

1.  Navigate to the `backend/` directory:
    ```bash
    cd backend
    ```
2.  Install all required dependencies:
    ```bash
    npm install
    ```
3.  Create a file named **`.env`** in the `backend/` root directory and add your configuration:
    ```
    # MongoDB connection string (e.g., from Atlas)
    MONGO_URI=mongodb+srv://<user>:<password>@clustername/dbName
    
    # Secret key for JWT signing
    JWT_SECRET=your_strong_secret_key_here
    
    # Port for the server to run on
    PORT=5000 
    
    # (Optional) For future AI integration:
    GEMINI_API_KEY=YOUR_API_KEY
    ```
4.  Start the backend server:
    ```bash
    npm run dev  # or equivalent script using nodemon/node
    ```
    The API should now be running at `http://localhost:5000`.

### 2. Frontend Setup

1.  Navigate to the project's root directory (or the main frontend folder):
    ```bash
    cd .. # if you are still in the backend folder
    npm install
    ```
2.  Install all required dependencies:
    ```bash
    npm install
    ```
3.  Start the React application:
    ```bash
    npm run dev
    ```
    The application will open in your browser (e.g., at `http://localhost:5173`).

---

## 🔒 API Endpoints

The API follows a RESTful architecture, utilizing JWT middleware to protect authenticated routes.

| Resource | Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- | :--- |
| **Auth** | `POST` | `/api/auth/register` | Creates a new user and returns a JWT token. | Public |
| **Auth** | `POST` | `/api/auth/login` | Authenticates user credentials and returns a JWT. | Public |
| **Journal** | `GET` | `/api/journal` | Retrieves all journal entries for the authenticated user. | Private |
| **Journal** | `POST` | `/api/journal` | Creates a new entry (Requires `{title, content}`). | Private |
| **Journal** | `PUT` | `/api/journal/:id` | Updates a specific entry by ID. | Private |
| **Journal** | `DELETE` | `/api/journal/:id` | Deletes a specific entry by ID. | Private |

---

## 🤝 Project Roadmap & Future Enhancements

* **Toast Notifications:** Add success/error message toasts (e.g., using React Hot Toast) for better user feedback on CRUD operations.
* **Filtering/Sorting:** Implement functionality to sort and filter journal entries by date.