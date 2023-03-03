const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://Anmoljain:Anmoljain@cluster0.wd0vl2o.mongodb.net/HomeLLC"

const connectToMongo = async ()=>{
    try {
        await mongoose.connect(mongoURI);
        console.log('DB Connection Successfull')
    }
    catch(err){
        throw err;
    };

    mongoose.connection.on("disconnected", ()=>{
        console.log("mongo disconnected");
    })
}

module.exports = connectToMongo;