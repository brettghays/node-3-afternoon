const express = require('express');
const bodyParser = require ('body-parser');
const session = require('express-session');
const checkForSession = require('./middlewares/checkForSession');
require ('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));
app.use(checkForSession);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Welcome to the big show on port ${port}!`));