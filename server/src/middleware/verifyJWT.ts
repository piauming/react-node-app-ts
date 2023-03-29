import { Request, Response, NextFunction } from "express";
import { verify, Secret } from "jsonwebtoken";
import { RequestHeaders } from "../interfaces";

const accessTokenSecret: Secret = process.env.ACCESS_TOKEN_SECRET!;

const verifyJWT = (req: RequestHeaders, res: Response, next: NextFunction) => {
    let authHeader = req.headers.authorization || req.headers.Authorization;
    authHeader = authHeader || '';

    if (!authHeader.startsWith('Bearer ')) return res.sendStatus(401);

    const token = authHeader.split(' ')[1];
    verify(
        token,
        accessTokenSecret,
        (err, decoded) => {
            if (err) return res.sendStatus(403); //invalid token
            // req.user = decoded.UserInfo.email;
            next();
        }
    );
}

export default verifyJWT;