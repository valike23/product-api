import { Router } from "express";
import { addConfigCtrl, editConfigCtrl, getConfigCtrl } from "../controllers/configCtrl";
import { Admin } from "../helphers/admin";

export const settingsRouter = Router();

settingsRouter.post('/settings', Admin.authMiddleware, addConfigCtrl);
settingsRouter.get('/settings', getConfigCtrl);
settingsRouter.put('/settings',Admin.authMiddleware, editConfigCtrl )