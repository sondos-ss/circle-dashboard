import "dotenv/config";
import dns from "node:dns/promises";
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import memberRoutes from "./routes/members";
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();
const port:number = Number(process.env.PORT) || 3000;
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  throw new Error("MONGO_URI is not defined in the environment variables");
}

app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.urlencoded({ extended: true }));
app.use('/', memberRoutes);

const start = async () => {
  try {
    await mongoose.connect(mongoUri);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("An unknown error occurred");
    }
  }
};

start();
