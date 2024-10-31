require('dotenv').config();
const express = require('express');
const connectDB = require('./config/DB');
const app = express();
const port = process.env.PORT || 2000;

const cookieParser = require('cookie-parser');
const userrouter = require('./routes/userRoutes');
const barberrouter = require('./routes/barberRoutes');
const Bookingrouter = require('./routes/bookingRoutes');

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', userrouter);
app.use('/', barberrouter);
app.use('/', Bookingrouter);




connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}/`);
        });
    })
    .catch((err) => {
        console.log(err);
    });
