const cors = require('cors')
const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const apiRoutes = require('./routes/api');
const webRoutes = require('./routes/web');
const corsOptions = require('./config/cors');
const dbConfig = require('./config/database');

dotenv.config();

const app = express();

app.use('/api', apiRoutes);
app.use(webRoutes);

app.use(express.json());
app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: true }));

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

