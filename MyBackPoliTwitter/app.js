var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');


// IMPORT ROUTES
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users.route');
var postsRouter = require('./routes/posts.route');


// IMPORT DB CONNECTION MANAGER
const dbManager = require ("./database.config/database.manager");

var app = express();
app.use(cors());//adicion cors
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Set the routing routes to the each script
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/post', postsRouter);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("SERVER IS LISTEN ON PORT:" , PORT);
});

/**
 * Testing the connection to the database and recreate the models if the tables doesn´t exists  
 */
dbManager.sequelizeConnection.authenticate()
  .then(() => {
    console.log('****Connection has been established successfully.****');
    // recreate the models if the tables doesn´t exists
    dbManager.sequelizeConnection.sync().then(() => {
        console.log("Database Synced");
      });

  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = app;
