const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: 'manager', 
  database: 'todo_db' 
});

db.connect(err => {
  if (err) {
    console.error('Error while connecting :', err);
  } else {
    console.log('Connected');
  }
});

module.exports = db;
