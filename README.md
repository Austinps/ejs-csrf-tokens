# EJS CSRF Tokens

This project is a Node.js application that demonstrates the implementation of CSRF (Cross-Site Request Forgery) protection using tokens. It utilizes the EJS templating engine and includes various dependencies such as bcrypt, cookie-parser, csrf, dotenv, express, helmet, morgan, and cors.

## Installation

To run this project locally, follow these steps:

Clone the repository:

git clone https://github.com/your-username/ejs-csrf-tokens.git
Navigate to the project directory:

cd ejs-csrf-tokens
Install the dependencies:

npm install
Start the development server:

npm start

## Usage

This application demonstrates the implementation of CSRF protection using tokens. It provides routes for user authentication and protected routes that require a valid CSRF token.

The main functionality of the application is divided into two routers:

- authRouter.js: Handles user authentication routes.
- protectedRouter.js: Defines protected routes that require a valid CSRF token.

To start using the application, make requests to the following endpoints:

- POST /auth/login: Authenticate the user and obtain a CSRF token.
- GET /protected: Access a protected route by including the CSRF token in the request headers.
- Configuration

The project utilizes a configuration file located at .env to manage environment variables. Make sure to create a .env file in the project's root directory and provide the necessary configuration options.

## License

This project is licensed under the ISC License - see the LICENSE file for details.

## Contributing

Contributions are always welcome! If you would like to contribute to this project, please create a pull request.
