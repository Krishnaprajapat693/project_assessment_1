import express from 'express';
import dotenv from 'dotenv';

import { connectDB } from './Utils/connectdb.js';
import cors from "cors";
import routes from "./routes/router.js"

dotenv.config();

const app = express();
const port = process.env.PORT || 5000 ;
app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
   connectDB();
});

app.use("/api", routes);

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});