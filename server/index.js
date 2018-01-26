const express = require('express');
const bodyParser = require ('body-parser');
const session = require('express-session');

const checkForSession = require('./middlewares/checkForSession');

const sc = require('./controllers/swag_controller');
const ac = require('./controllers/auth_controller');
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

app.post('/api/login', ac.login);
app.post('/api/register', ac.register);
app.post('/api/signout', ac.signout);
app.get('/api/user', ac.getUser);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Welcome to the big show on port ${port}!`));