const express = require('express');
const path = require('path');
const { connectMongoDB } = require('./connect');
const cookieParser = require('cookie-parser');
const { checkForAuthentication, restrictTo } = require('./middlewares/auth');

// Routes
const urlRoute = require('./routes/url');
const staticRoute = require('./routes/staticRouter');
const userRoute = require('./routes/user');

// Declaration of APP
const app = express();
const port = 3000;

// Passing URL of Database
connectMongoDB("mongodb://127.0.0.1:27017/short-url")
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// Setting the frontend
app.set("view engine", "ejs");
app.set('views', path.resolve("./views"));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Debugging: Log middleware functions
console.log('checkForAuthentication:', checkForAuthentication);
console.log('restrictTo:', restrictTo);



app.use(checkForAuthentication); // Ensure it's a valid middleware function
app.use("/url", restrictTo(["NORMAL"]), urlRoute); // Ensure it's a valid middleware function
app.use("/user", userRoute);
app.use("/", staticRoute);

// Starting the server
app.listen(port, () => {
    console.log(`Server started at port: ${port}`);
});
