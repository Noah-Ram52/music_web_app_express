# Music Web App

## Music Web App Back-End

The back-end handles multiple HTTP requests (GET, POST), uses Mongoose schemas, and manages authentication errors. You can create a user and send it to the database, then view it in MongoDB Compass to verify it was stored correctly.

## Database Users

When users are created and sent to the database, you can view them using MongoDB Compass while connected to the MongoDB server. After a user is created, you can sign in with the email and password.

## Working with Back-End Errors

Custom errors are defined in their respective files. The back-end sends meaningful error messages when data is sent incorrectly. For example, an unauthorized login attempt will return the message `"Incorrect email or password"`.

## Running Back-End (Locally)

1. Make sure you are in the correct directory:
   ```bash
   cd music_web_app_express
   ```
   Use Git Bash or your system terminal from this folder.

2. Install dependencies:
   ```bash
   npm install
   ```
   (All dependencies are listed in `package.json`.)

3. Check the environment file:
   - In the root of `music_web_app_express`, open the `.env` file.
   - It contains:
     - `PORT` (server port)
     - `MONGODB_URI` (MongoDB connection string)
     - `JWT_SECRET` (secret for JWT tokens)

4. Remember to set the MONGODB_URI .env correctly . Example: `mongodb://localhost:30000/music_app`

4. Start the back-end server:
   ```bash
   npm run dev
   ```
   If the database is running correctly, the console will show:
   `✅ MongoDB connected`.