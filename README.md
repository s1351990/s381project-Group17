# Project Name: Online Schedule Application

## Project Information
- **Group Info:** 
  - Group No.: 17
  - Members: 
  Lam Tai Cheung -  (SID: 13519900)
  LIE Ka Wing  -  (SID: 13506952)
  Lee Shing Tak  -  (SID: 13514430)
  Wong Shu Fung  -  (SID: 13513064)
    
## Project File Introduction
- **server.js:** This file sets up an Express server with the following functionalities:
  - **User Authentication:** Handles login, logout, and cookie-session for session management.
  - **CRUD Operations:** Allows users to create, read, update, and delete items. Each action is protected and requires user authentication.
  - **MongoDB Integration:** Connects to a MongoDB database using Mongoose.

- **package.json:** Contains dependencies:
  - express
  - mongoose
  - ejs
  - cookie-session
  - body-parser
  
- **Install:**npm install express mongoose ejs cookie-session body-parser

- **public (folder):** Contains static assets like stylesheets files (for backup).

- **views (folder):** Contains EJS templates for rendering the UI, including pages for login, register, schedule create, read, update, and delete.

- **models (folder):** Includes Mongoose model files for User and Item, defining the structure of the data stored in MongoDB.

## Cloud-Based Server URL
- [Test Server URL](https://s381project-group17.onrender.com/)

## Operation Guides

### User Flow
- **Login/Logout Pages:**
  - Access `/login` to enter credentials and log in.
  - Use `/logout` to end the session.

- **Registration:**
  - Access `/register` to create a new account. An error message is shown if the email is already registered.

- **CRUD Web Pages:**
  - **Create:** Navigate to `/create` to add a new schedule.
  - **Read:** View all schedule at `/read`.
  - **Update:** Edit an schedule using `/update/:id`.
  - **Delete:** Remove an schedule by submitting a form to `/delete/:id`.
  
### RESTful CRUD Services
- **APIs and HTTP Requests:**
  - **Create:** `POST /create` - Add a new schedule.
  - **Read:** `GET /read` - Retrieve all schedule for the logged-in user.
  - **Update:** `POST /update/:id` - Update an schedule by ID.
  - **Delete:** `POST /delete/:id` - Remove an schedule by ID.
  
- **CURL Testing Commands:**
  - Register: curl -X POST https://s381project-group17.onrender.com/register \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=testuser&email=test@example.com&password=testpass"
  
  - login: curl -X POST https://s381project-group17.onrender.com/login \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=testuser&password=testpass" \
  -v -c cookies.txt
  
  - Create: curl -X POST https://s381project-group17.onrender.com/create \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -b cookies.txt \
  -d "title=Test Item&description=This is a test item"
  
  - Read: curl -X GET https://s381project-group17.onrender.com/read \
  -b cookies.txt \
  -v
  
  - Update: curl -X POST https://s381project-group17.onrender.com/update/:id \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -b cookies.txt \
  -d "title=Updated Item&description=This is updated"

  - Delete: curl -X POST https://s381project-group17.onrender.com/delete/:id \
  -b cookies.txt
  
  - logout: curl -X GET https://s381project-group17.onrender.com/logout \
  -b cookies.txt
