import { Request, Response } from "express";
import * as jwt from 'jsonwebtoken'

export interface TypedRequestBody<T> extends Request {
    body: T
}

export interface UserInfoJwtPayload extends jwt.JwtPayload {
    email: string,
    roles?: string[]
}

export interface RequestCookie extends Request {
	cookies:  {
		jwt: string
	}
}

export interface RequestHeaders extends Request {
    headers: {
        authorization?: string,
        Authorization?: string
    }
}

