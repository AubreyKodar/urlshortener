const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dbConfig = require('./config/database');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

const apiRoutes = require('./routes/api');

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', apiRoutes);

const SERVER_PORT = 3000;

mongoose
    .connect(dbConfig.url(), {
        useNewUrlParser: true,
        user: dbConfig.user,
        pass: dbConfig.pwd,
    })
    .then(() => {
        app.listen(SERVER_PORT);
        console.log(`listening on port ${ SERVER_PORT }`)
    })
    .catch(err => {
        console.log('connection failed');
        console.log(err);
    });

