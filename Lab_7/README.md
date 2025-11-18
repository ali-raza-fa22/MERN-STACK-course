# Passport.js to handle local authentication (username/password) and OAuth.

## Objective

The objective of this lab is to introduce students to authentication and authorization using
Passport.js. Students will:

- Implement local authentication (username/password).
- Hash and securely store user passwords.
- Configure third-party authentication using OAuth (optional).

## Activity Outcomes:

By the end of this lab, students will be able to:

- Implement user authentication using Passport.js.
- Securely store user credentials with bcrypt hashing and salting.
- Integrate third-party login providers (Google OAuth, GitHub, etc.).

---

## Passport.js for authentication

79
Passport.js is a popular authentication middleware for Node.js. It provides a flexible and modular approach to authenticate users using various strategies, such as local login or third-party providers (Google, Facebook, etc.). It's lightweight and works seamlessly with Express applications.

## Local Strategy for username/password login

The Local Strategy is a Passport.js strategy used for username and password authentication. It verifies user credentials against a database and is commonly used for traditional logins where users register and log in with their credentials.

## OAuth Strategy for third-party authentication

The OAuth Strategy in Passport.js enables third-party authentication (e.g., Google, Facebook,
GitHub). It allows users to log in using accounts from external services without having to create a new account on your application.

## Password hashing using bcryptjs

bcryptjs is a JavaScript library used to hash and compare passwords securely. It protects user passwords by converting them into a secure format before storing them in the database, making it harder for attackers to retrieve the original password.
