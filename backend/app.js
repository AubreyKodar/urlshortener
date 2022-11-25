const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const dbConfig = require('./config/database');

dotenv.config();

const app = express();

const apiRoutes = require('./routes/api');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
        console.log('database connection failed');
        console.log(err);
    });

