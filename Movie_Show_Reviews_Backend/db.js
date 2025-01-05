import mysql from 'mysql2/promise';

const MAX_RETRIES = 30; // Maximum number of retries (5 minutes with 10-second intervals)
const RETRY_INTERVAL = 10000; // 10 seconds

const waitForDatabase = async () => {
  let retries = 0;
  
  while (retries < MAX_RETRIES) {
    try {
      const db = await mysql.createConnection({
        host: 'mysql',  //process.env.DB_HOST ||
        user:  'root',  //process.env.DB_USER ||
        password: 'Boomboom#1212',  //process.env.DB_PASSWORD || 
        database:  'shows_movie_reviews_',  //\\process.env.DB_NAME
        connectTimeout: 10000 // 10 second timeout
      });
      
      // Test the connection
      await db.query('SELECT 1');
      console.log('Successfully connected to MySQL database!');
      return db;
    } catch (err) {
      retries++;
      console.log(`Database connection attempt ${retries}/${MAX_RETRIES} failed:`, err.message);
      
      if (retries === MAX_RETRIES) {
        console.error('Max retries reached. Could not connect to database.');
        throw new Error('Unable to connect to database after maximum retries');
      }
      
      console.log(`Waiting ${RETRY_INTERVAL/1000} seconds before retrying...`);
      await new Promise((resolve) => setTimeout(resolve, RETRY_INTERVAL));
    }
  }
};

const db = await waitForDatabase();

export default db;
