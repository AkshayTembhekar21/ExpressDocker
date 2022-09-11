const express = require('express')
const app = express()
const port = 4000

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '12345678',
  database : 'test'
});


projects = [{
    id: 1,
    name: "express Test Project 1",
    description: "learning purpose"
}]

function getDataFromEmployee(){
  //connection.connect();
 
  connection.query('SELECT * from Employee', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results);
  });
  
  //connection.end();
}

app.get('/', (req, res) => {
  res.send('Hello World!')
  connection.connect();
  getDataFromEmployee();
  connection.end();
})

app.get('/insert', (req, res) => {
  //res.send('Inside insert');
  var post  = {name: 'Dihadi 3', salary: 600};
  connection.connect();
  var query = connection.query('INSERT INTO Employee SET ?', post, function (error, results, fields) {
    if (error) throw error;
  });
  console.log(query.sql);
  getDataFromEmployee();
  connection.end();
  res.send('Inside insert');
})

app.get('/delete', (req, res) => {
  connection.connect();
  var query = connection.query('DELETE FROM Employee WHERE id = 3', function (error, results, fields) {
    if (error) throw error;
  });
  console.log(query.sql);
  getDataFromEmployee();
  connection.end();
  res.send('Inside delete');
})


app.get('/projects', (req, res) => {
    res.send(projects)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})