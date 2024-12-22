import express from 'express';
import db from './db.js';
import passport from './passport-config.js';
import bcrypt from 'bcryptjs';
import session from 'express-session';
import bodyParser from 'body-parser';

const app = express();


//help manage sessions
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    }
  }));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(passport.initialize());
app.use(passport.session());

// Middleware for parsing JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//register
app.post('/register', async (req, res) => {
    const { username, password,  } = req.body;
    try {
        //first hashing the password, will be salted 10 times
        const hashedPassword = await bcrypt.hash(password, 10);

      const [result] = await db.execute(
        'INSERT INTO users (username, password) VALUES (?, ?)',
        [username, hashedPassword]
      );
      res.status(201).json({ message: 'User created!', id: result.insertId });
      //after user created I'd probably want to redirect them to a login page im assuming
      // I'm just going to send a user sucessfully created response and let the frontend use that in order to redirect if successful

    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            res.status(400).json({ error: 'Username already exists' });
          } else {
            res.status(500).json({ error: err.message });
          }
    }
});

//login
app.post('/login',passport.authenticate('local'), (req, res) => {
    res.status(200).json({ message: 'Login successful!', user: req.user });
});


/**
 * Checks if the user is authenticated.
 * If yes, calls next() to continue the execution of the route.
 * If no, sends a 401 Unauthorized response with a message.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next function.
 */
//uses middleware to create authentication for everything after
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).json({ message: 'Unauthorized. Please log in.' });
  };
  


//logout
app.get('/logout', isAuthenticated, (req, res) => {
    if (isAuthenticated){
    req.logout();
    res.status(200).json({ message: 'Logout successful!' });
    }else
    res.status(401).json({ message: 'Not logged in!' });
  });


  app.get('/profile',isAuthenticated, (req, res) => {
    res.json({ message: 'Welcome to your profile!', user: req.user });
  });



// Route to getting all reviews
  app.get('/reviews',isAuthenticated, async (req, res) => {

      try {
          const [results] = await db.execute('SELECT * FROM reviews'); // Adjust table name
          res.json(results);
        } catch (err) {
          res.status(500).json({ error: err.message });
        }
    
  });


// Example Route: Add a Review
app.post('/reviews/post', isAuthenticated, async (req, res) => {
    const createdBy=req.user.UserID;
    const { title, description, rating, genre, imgUrl} = req.body; 
    console.log(`Title: ${title}, Description: ${description}, Rating: ${rating}, Genre: ${genre}, Image URL: ${imgUrl} , User ID: ${createdBy}`);

    try {
      const [result] = await db.execute(
        'INSERT INTO reviews (title, description, Rating, Genre, imageUrL, createdBy) VALUES (?,?,?,?,?,?)',
        [title, description, rating, genre, imgUrl, createdBy]
      );
      res.status(201).json({ message: 'Review added!' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });


  //review delete endpoint
  app.delete('/reviews/:id',isAuthenticated, async (req, res) => {
    const reviewId = req.params.id;
    try {
      const [result] = await db.execute('DELETE FROM reviews WHERE ReviewID = ?', [reviewId]);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Review not found' });
      }
      res.status(200).json({ message: 'Review deleted!' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });



// Error-Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack); // Logs the error stack to the console
    res.status(500).json({ error: 'Something went wrong!' }); // Sends a response to the client
  });

  // Graceful termination logic
process.on('SIGINT', async () => {
    try {
      await db.end(); // Closes the MySQL connection
      console.log('Database connection closed.');
    } catch (err) {
      console.error('Error closing the database connection:', err.message);
    }
    process.exit(0);
  });


const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
