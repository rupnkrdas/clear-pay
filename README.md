# Clear-Pay

Clear-Pay is a secure and efficient payments application built using the MERN stack (MongoDB, Express.js, React, Node.js) with Tailwind CSS for a modern and responsive user interface. This project incorporates Zod for data validation and JSON Web Tokens (JWT) for user authentication. Clear-Pay enables users to register, create accounts, and receive a random amount of money. The application also features robust error handling to ensure a smooth user experience.

## Demo

https://github.com/rupnkrdas/payments-app/assets/88283289/61924757-e11a-49bd-87a6-609f99a49f73

## Features

-   **User Registration and Accounts**: Register and create accounts to receive a random amount of money.
-   **Zod Data Validation**: Utilizes Zod for robust data validation to ensure data integrity.
-   **Random Amounts**: Users receive a random amount of money upon creating an account.
-   **MERN Stack**: Leverages MongoDB, Express.js, React, and Node.js for a scalable and efficient application.
-   **User Authentication**: Implements secure user authentication using JSON Web Tokens (JWT).
-   **Robust Error Handling**: Ensures a smooth user experience through comprehensive error handling.

## Technologies Used

-   **MongoDB**: A NoSQL database used to store and manage payment data.
-   **Express.js**: A web application framework for building server-side logic.
-   **React**: A JavaScript library for building user interfaces.
-   **Node.js**: A JavaScript runtime for server-side development.
-   **Tailwind CSS**: A utility-first CSS framework for styling the frontend.
-   **Zod**: A TypeScript-first schema declaration and validation library.
-   **JWT Authentication**: Provides secure user authentication through JSON Web Tokens.

## Getting Started

1. **Clone the Repository:**

    ```bash
    git clone https://github.com/your-username/clear-pay.git
    cd clear-pay
    ```

2. **Install Dependencies:**

    ```bash
    # Install backend dependencies
    cd backend
    npm install

    # Install frontend dependencies
    cd ../frontend
    npm install
    ```

3. **Setup MongoDB:**

    - Create a MongoDB database instance and obtain the connection URI.

4. **Set Environment Variables:**

    - Set up environment variables for your project. Create a `.env` file in the root directory of your project.
    - Add the following lines to your `.env` file:

        ```dotenv
        # .env

        # Replace 'your-mongo-database-uri' with your actual MongoDB connection URI
        MONGO_URI=your-mongo-database-uri
        # Replace 'your-jwt-secret' with your actual JWT secret
        JWT_SECRET=your-jwt-secret
        ```

5. **Access Environment Variables in Your Code:**

    - Update the code to access the environment variables directly.

        ```javascript
        // backend/index.js or backend/app.js

        require("dotenv").config();

        const JWT_SECRET = process.env.JWT_SECRET;
        const MONGODB_URI = process.env.MONGODB_URI;

        // Your application logic here, using JWT_SECRET and MONGODB_URI as needed
        ```

6. **Run the Application:**

    ```bash
    # Start the backend (from the backend directory)
    npm start

    # Start the frontend (from the frontend directory)
    npm run dev
    ```

7. **Open in Browser:**
   Once the application is running, open your browser and go to the provided client URL, e.g., [http://localhost:3000/](http://localhost:3000/), to experience the Clear-Pay Payments Application.

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests.
