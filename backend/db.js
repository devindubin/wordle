import mongoose from "mongoose";

const dbPassword = process.env.DB_PASSWORD;
const uri = `mongodb+srv://devindubin:${dbPassword}@wordle.90wjo.mongodb.net/?retryWrites=true&w=majority&appName=wordle`;

const dbConnect = async () => {
  try {
    await mongoose.connect(uri, {});
    console.log("Connected to the database");
  } catch (error) {
    console.log("Error connecting to the database: ", error);
  }
};

export default dbConnect;
