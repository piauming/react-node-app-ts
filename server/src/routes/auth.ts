import express, { Request, Response, NextFunction } from "express";
const authRouter = express.Router();
import * as authController from "../controllers/authController";

authRouter.route('/')
    .post(authController.handleLogin);

export default authRouter;