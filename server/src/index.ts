import express from "express";
import * as path from 'path';
import * as dotenv from "dotenv";
dotenv.config();
import cors from 'cors';
import { corsOptions } from "./config/corsOptions";
import cookieParser from 'cookie-parser';
import { credentials } from "./middleware/credentials";
import { registerRouter, authRouter } from "./routes";

const PORT = process.env.PORT;

const app = express();

app.use(credentials);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false })); 
app.use(express.json()); // middleware (built-in) for json 
app.use(cookieParser()); // middleware for cookies

// serve static files
app.use('/', express.static(path.join(__dirname, '/public')));

app.use('/register', registerRouter);
app.use('/auth', authRouter);

// app.get('/', (req, res) => {
//   res.send("Asdads");
// })

app.listen(PORT, () => {
    console.log(`now listening on port ${PORT}`);
  });