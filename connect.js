const mongoose = require('mongoose');

async function connectMongoDB(url){
    //connection to mongoDB
    return mongoose.connect(url)
        .then(() => {
            console.log("MongoDB Connected");
        })
        .catch((err) => {
            console.log("MONGODB ERROR! : ", err);
        })   
}

module.exports = {
    connectMongoDB
}