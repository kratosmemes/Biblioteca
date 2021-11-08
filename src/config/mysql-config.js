const mysql      = require('mysql');
const Connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'biblioteca'
});
 
Connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + Connection.threadId);
});

module.exports = Connection;