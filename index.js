const express = require('express');
const { connectMongoDB } = require('./connect');
const urlRoute = require('./routes/url');

const app = express();
const port = 3000;

app.use(express.json());
app.use("/url", urlRoute);



connectMongoDB("mongodb://127.0.0.1:27017/short-url");

app.listen(port, () => {
    console.log(`Server started at port: ${port}`);
});
