const cors = require('cors')
const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const dbConfig = require('./config/database');
const corsOptions = require('./config/cors');

dotenv.config();

const app = express();

const apiRoutes = require('./routes/api');

app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', apiRoutes);

mongoose
    .connect(dbConfig.url(), {
        useNewUrlParser: true,
        user: dbConfig.user,
        pass: dbConfig.pwd,
    })
    .then(() => {
        app.listen(process.env.API_PORT);
        console.log(`listening on port ${ process.env.API_PORT }`)
    })
    .catch(err => {
        console.log('database connection failed');
        console.log(err);
    });

