# Hotel_Management_API_TypeScript

This is my first application of Typescript in NodeJs

Hotel Management API (TypeScript)
This is a RESTful API built with [TypeScript](https://www.typescriptlang.org/), [Node.js](https://nodejs.org/en/), and MongoDB for managing hotel rooms and reservations. The API allows users to perform various actions, such as creating, updating, deleting rooms, and viewing all rooms available.

## Technologies Used

- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)

Getting Started
To use this API, you will need to have Node.js and MongoDB installed on your computer. Then, follow these steps:

1. Run `git clone https://github.com/Estate360/Hotel_Management_API_TypeScript.git` to clone the repository to your local machine.

2. Run `cd Hotel_Management_API_TypeScript` to navigate to the cloned repository directory.
3. Install the required dependencies:

4. Run `npm install` to install the required dependencies.
   npm start

5. Run `npm start` to start the server.
   The server will start running at http://localhost:8000 or http://localhost:5000. You can now use this API to perform various actions.

## API Endpoints

The API provides the following endpoints:

### Authentication Methods

- POST /api/v1/users/register:
  Creates/registers a new user
- POST /api/v1/users/login:
  Logs a user in
- GET /api/v1/users:
  Gets all users
- GET /api/v1/user/:id :
  Gets a a particular user by ID
- PATCH /api/v1/user/:id :
  Updates a user info
- DELETE /api/v1/user/:id :
  Deletes a user

  ### Room types Methods

- POST /api/v1/rooms-types:
  Creates a new room
- GET /api/v1/rooms-types:
  Gets all available rooms types

  ### Rooms Methods

- POST /api/v1/rooms:
  Creates a new room
- GET /api/v1/rooms:
  Gets all available rooms
- GET /api/v1/room/:id :
  Gets a a particular room by ID
- PATCH /api/v1/user/:id :
  Updates a room's info
- DELETE /api/v1/user/:id :
  Deletes a room by ID

## Contributing

If you're interested in contributing to this project, please feel free to fork the repository and make any changes you like. Once you're ready, submit a pull request to have your changes reviewed and merged into the main branch.

### License

This project is licensed under the MIT License. See the [LICENSE](https://opensource.org/licenses/MIT) file for more information.

#### Leave a Star ⭐️ if you find this helpful or worth a Start
