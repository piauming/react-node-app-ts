import express from "express";
import * as path from 'path';
import * as dotenv from "dotenv";
dotenv.config();
import cors from 'cors';
import { corsOptions } from "./config/corsOptions";
import cookieParser from 'cookie-parser';
import { credentials, verifyJWT } from "./middleware";
import { registerRouter, authRouter, refreshRouter } from "./routes";

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
app.use('/refresh', refreshRouter);

// verify access-token before access api
app.use(verifyJWT);

app.get('/test', (req, res) => {
  res.send("Asdads");
})

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`now listening on port ${PORT}`);
  });