import { Request, Response } from "express";
import * as jwt from 'jsonwebtoken'

export interface TypedRequestBody<T> extends Request {
    body: T
}

export interface UserInfoJwtPayload extends jwt.JwtPayload {
    email: string,
    roles?: string[]
}