import { Response } from "express";
import { RequestCookie, UserInfoJwtPayload } from "../interfaces";
import { db } from "../util/db.server";
import { verify, Secret, sign, SignOptions } from 'jsonwebtoken';

// access token
const accessTokenSecret: Secret = process.env.ACCESS_TOKEN_SECRET!;
const accessSignInOptions: SignOptions = { expiresIn: process.env.ACCESS_TOKEN_EXPIRE };
// refresh token
const refreshTokenSecret: Secret = process.env.REFRESH_TOKEN_SECRET!;

export const handleRefreshToken = async (req: RequestCookie, res: Response) => {
    // Get the refresh-token in cookie
    const cookies = req.cookies;

    console.log("cookies", cookies);

    if (!cookies?.jwt) {
        console.log(401);
        return res.sendStatus(401);
    }

    const refreshToken = cookies.jwt;

    const user = await db.user.findFirst({
        where: {
            refreshToken: refreshToken
        },
    });

    if (!user) {
        return res.sendStatus(403); // Unauthorized
    }

    verify(
        refreshToken,
        refreshTokenSecret,
        (err, decoded) => {
            if (err) {
                return res.sendStatus(403);
            }

            const decodedPayload = decoded as UserInfoJwtPayload; // <--- Cast here for Typescript
            if (user.email !== decodedPayload.email) {
                return res.sendStatus(403);
            }

            const payload: UserInfoJwtPayload = { email: user.email };
            const accessToken = sign(payload, accessTokenSecret, accessSignInOptions);
            // if the refresh-token is valid, return a new access-token
            res.json({ accessToken })
        }
    );
}