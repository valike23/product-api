import { Router } from "express";
import { addConfigCtrl, getConfigCtrl } from "../controllers/configCtrl";
import { Admin } from "../helphers/admin";

export const settingsRouter = Router();

settingsRouter.post('/settings', Admin.authMiddleware, addConfigCtrl);
settingsRouter.get('/settings', getConfigCtrl);