const express = require('express');
const bodyParser = require ('body-parser');
const session = require('express-session');

const checkForSession = require('./middlewares/checkForSession');

const sc = require('./controllers/swag_controller')
require ('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));
app.use(checkForSession);

const baseURL = '/api/swag';
app.get(baseURL, sc.read);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Welcome to the big show on port ${port}!`));