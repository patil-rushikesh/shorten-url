const express = require('express');
const path = require('path');
const { connectMongoDB } = require('./connect');
const urlRoute = require('./routes/url');
const staticRoute = require('./routes/staticRouter')
const { allowedNodeEnvironmentFlags } = require('process');

const app = express();
const port = 3000;

connectMongoDB("mongodb://127.0.0.1:27017/short-url");

app.set("view engine", "ejs")
app.set('views', path.resolve("./views"))


app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use("/url", urlRoute);
app.use("/", staticRoute);

app.listen(port, () => {
    console.log(`Server started at port: ${port}`);
});
