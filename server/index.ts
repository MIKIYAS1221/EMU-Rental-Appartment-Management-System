import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import roomRoute from './routes/roomRoute';



dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())

app.use('/api', roomRoute);


connectDB();
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

