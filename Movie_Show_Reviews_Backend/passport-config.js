import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import db from './db.js'; // MySQL database connection
import bodyParser from 'body-parser';



// Define the Passport local strategy
passport.use(
  "local",
  new LocalStrategy(async function verify(username, password, cb) {
    try {
      const [result] = await db.query("SELECT * FROM users WHERE Username = ?", [
        username]);
      if (result.length > 0) {
        console.log(`This is the result: ${JSON.stringify(result)}`);
        const user = result[0];
        console.log(`This is the user object: ${JSON.stringify(user)}`);
        const storedHashedPassword = user.Password;
        console.log(`This is the hashed password: ${JSON.stringify(storedHashedPassword)}`);
        console.log(` This is the user inputed password: ${password}`);
        bcrypt.compare(password, storedHashedPassword, (err, valid) => {
          if (err) {
            console.error("Error comparing passwords:", err);
            return cb(err);
          } else {
            if (valid) {
              return cb(null, user);
            } else {
              return cb(null, false);
            }
          }
        });
      } else {
        return cb("User not found");
      }
    } catch (err) {
      console.log(err);
    }
  })
);

// Serialize user to store in session
passport.serializeUser((user, done) => {
  done(null, user.UserID); // Store the user's unique ID in the session
});

// Deserialize user to retrieve from session
passport.deserializeUser(async (id, done) => {
  try {
    // Fetch the user by ID from the database
    const [rows] = await db.execute('SELECT * FROM users WHERE UserID = ?', [id]);
    const user = rows[0];

    if (!user) {
      return done(new Error('User not found'));
    }

    done(null, user); // Attach the user object to the `req.user`
  } catch (err) {
    done(err);
  }
});

export default passport;
