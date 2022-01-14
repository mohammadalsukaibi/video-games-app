var express = require('express');
const path = require('path');
var mongoose = require('mongoose');
let dotenv = require('dotenv').config()

console.log(process.env.MONGODB_URI);


// routers
const indexRouter = require('./routes/index');
const catalogRouter = require('./routes/catalog');

var app = express();

//Set up mongoose connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true , useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// set the view engine to ejs
app.set('view engine', 'ejs');

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/', indexRouter);
app.use('/catalog', catalogRouter);



// index page
// app.get('/', function(req, res) {
//   res.render('index');
// });


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))