import express from "express";
import * as refreshTokenController from '../controllers/refreshTokenController';

const refreshRouter = express.Router();

refreshRouter.route('/')
    .get(refreshTokenController.handleRefreshToken);

export default refreshRouter;