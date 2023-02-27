# Hotel_Management_API_TypeScript

This is my first application of Typescript in NodeJs
And it is live on [Render](https://estate-room-ease-server.onrender.com)😎

Hotel Management API (TypeScript)
This is a RESTful API built with [TypeScript](https://www.typescriptlang.org/), [Node.js](https://nodejs.org/en/), and MongoDB for managing hotel rooms and reservations. The API allows users to perform various actions, such as creating, updating, deleting rooms, and viewing all rooms available.

## Technologies Used

- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)

Getting Started Locally
To use this API, you will need to have Node.js and MongoDB installed on your computer. Then, follow these steps:

1. Run `git clone https://github.com/Estate360/Hotel_Management_API_TypeScript.git` to clone the repository to your local machine.

2. Run `cd Hotel_Management_API_TypeScript` to navigate to the cloned repository directory.
3. Install the required dependencies:

4. Run `npm install` to install the required dependencies.
   npm start

5. Run `npm run start-dev` to start the server.
   The server will start running at http://localhost:8000 or http://localhost:5000. You can now use this API to perform various actions.

## Hosted Link:
  https://estate-room-ease-server.onrender.com
## API Endpoints

This API provides the following endpoints:

### Authentication Methods

- POST https://estate-room-ease-server.onrender.com/api/v1/users/register:
  Creates/registers a new by entering the body info. e.g. are below
- POST https://estate-room-ease-server.onrender.com/api/v1/users/login:
  Logs a user in
- GET https://estate-room-ease-server.onrender.com/api/v1/users/:
  Gets all users
- GET https://estate-room-ease-server.onrender.com/api/v1/users/:id :
  Gets a a particular user by ID
- PATCH https://estate-room-ease-server.onrender.com/api/v1/users/:id :
  Updates a user info
- DELETE https://estate-room-ease-server.onrender.com/api/v1/users/:id :
  Deletes a user

### Room types Methods

- POST https://estate-room-ease-server.onrender.com/api/v1/rooms-types:
  Creates a new room
- GET https://estate-room-ease-server.onrender.com/api/v1/rooms-types:
  Gets all available rooms types
- GET https://estate-room-ease-server.onrender.com/api/v1/room-type/:id :
  Gets a a particular room-type by ID
- PATCH https://estate-room-ease-server.onrender.com/api/v1/room-type/:id :
  Updates a room type info
- DELETE https://estate-room-ease-server.onrender.com/api/v1/room-type/:id :
  Deletes a room type by ID
  NOTE: This Room Type method is all restricted to only authenticated users who are Admins

### Rooms Methods

- POST https://estate-room-ease-server.onrender.com/api/v1/rooms :
  Creates a new room
- GET https://estate-room-ease-server.onrender.com/api/v1/rooms :
  Gets all available rooms
- GET https://estate-room-ease-server.onrender.com/api/v1/room/:id :
  Gets a a particular room by ID
- PATCH https://estate-room-ease-server.onrender.com/api/v1/room/:id :
  Updates a room's info
- DELETE https://estate-room-ease-server.onrender.com/api/v1/room/:id :
  Deletes a room by ID

### Examples and possible responses (error messages)

- Create a new user:
  Request
  enter the following on the body;
  {
  "name":"Will Smith",
  "email":"willsmith@gmail.com",
  "password":"0000000000",
  "confirmPassword":"0000000000"
  }

  Response;

  {
  "message": "User successfully created.",
  "token": "token appears here",
  "data": {
    "newUser": {
      "name": "Will Smith",
      "email": "willsmith@gmail.com",
      "role": "guest",
      "active": true,
      "_id": "63fd0edfae3348c5cb28f52b",
      "createdAt": "2023-02-27T20:13:19.195Z",
      "updatedAt": "2023-02-27T20:13:19.195Z",
      "__v": 0
    }
  }
  }
  (By default, you get the role of "guest" except if specified)

  if user already exists, the error responds becomes;
  {
  "error": "User already exists"
  }

  Note that the email and password fields are required for the login using POST link just as provided https://estate-room-ease-server.onrender.com/api/v1/users/login. You'll be provided with a token when you input the correct email and password.

  Also note that the token provided on login will be used carry out other functionalities like creation of roomTypes, rooms, deleting, editing etc... if you are an "admin" user.

## Contributing

If you're interested in contributing to this project, please feel free to fork the repository and make any changes you like. Once you're ready, submit a pull request to have your changes reviewed and merged into the main branch.

### License

This project is licensed under the MIT License. See the [LICENSE](https://opensource.org/licenses/MIT) file for more information.

#### Leave a Star ⭐️ if you find this helpful or worth a Start
