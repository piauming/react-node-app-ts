import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import { db } from "../util/db.server";
import { Secret, JwtPayload, sign, SignOptions } from 'jsonwebtoken';
import { TypedRequestBody, UserInfoJwtPayload } from "src/interfaces";

// access token
const accessTokenSecret: Secret = process.env.ACCESS_TOKEN_SECRET!;
const accessSignInOptions: SignOptions = { expiresIn: process.env.ACCESS_TOKEN_EXPIRE };

// refresh token
const refreshTokenSecret: Secret = process.env.REFRESH_TOKEN_SECRET!;
const refreshSignInOptions: SignOptions = { expiresIn: process.env.REFRESH_TOKEN_EXPIRE };

export const handleLogin = async (req: TypedRequestBody<{ email: string, password: string }>, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ 'message': 'email and password are required.' });
    }

    const user = await db.user.findUnique({
        where: {
            email: email,
        },
    });

    if (!user) {
        return res.sendStatus(401); // Unauthorised
    }

    const match = await bcrypt.compare(password, user.password);
    if (match) {
        const payload: UserInfoJwtPayload = { email: user.email };
        const accessToken = sign(payload, accessTokenSecret, accessSignInOptions);
        const refreshToken = sign(payload, refreshTokenSecret, refreshSignInOptions);

        const result = await db.user.update({
            where: {
                email: user.email,
            },
            data: {
                refreshToken: refreshToken,
            },
        });

        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'none', secure: true, maxAge: 24 * 60 * 60 * 1000 });
        res.json({ accessToken });
    }
    else {
        res.sendStatus(401);
    }
}