const express = require('express');
const userApp = require('./Routes/userApp');
const mysql = require('mysql2/promise');  // Import the mysql2 package
const path=require('path')
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.static(path.join(__dirname,'./build')))
// Define your MySQL connection configuration
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'Charanchakri@123',
  database: 'usersdata',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 10000
};

// Create a MySQL connection pool
const pool = mysql.createPool(dbConfig);

// Pass the MySQL connection pool to the userApp router
app.set('pool', pool);
pool.getConnection()
.then(con=>{
  console.log("Connected to MySQL server successfully");
})
.catch(err=>{
  console.error("Error in connecting to MySQL server:",err)
})
// API routes
app.use('/user-api', userApp);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


// error handling middleware
const errorHandlingMiddleware=(error,request,response)=>{
  response.send({message:error.message})
}
// path handling middleware
const pathHandlingMiddleware=(request,response,next)=>{
  response.send({message:"Invalid Path"})
}
// app.use(errorHandlingMiddleware)
app.use(pathHandlingMiddleware)