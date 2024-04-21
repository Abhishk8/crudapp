import mongoose from "mongoose";

const connectToMongoDB = async() =>{
try{
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to db");
}
catch(error){
    console.log("error to connection to db",error.message);
}
}
export default connectToMongoDB;