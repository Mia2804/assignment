const express = require('express'); //Line 1
const app = express(); //Line 2
const port = process.env.PORT || 5000; //Line 3
var http = require('http')
var fs = require('fs')
var cors = require('cors')
app.use(cors())
app.use(express.json());

var data = fs.readFileSync('demoset1.json', 'utf-8')
app.listen(port, () => console.log(`Listening on port ${port}`));
app.get('/express_backend', (req, res) => { //Line 9
   
    res.json({data}); //Line 10
  }); //Line 11

console.log("Server running at port 5000")