const mongoose = require('mongoose')
const dbConnect = async() =>{
try {
    mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to Database!")
} catch (error) {
    console.log("Error in connecting to database")
}

}
module.exports = dbConnect