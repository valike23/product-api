import {Router} from 'express';
import { adminLoginCtrl, adminRegisterCtrl, loginCtrl, registerCtrl } from '../controllers/accountsCtrl';

export const  accountRouter = Router();

accountRouter.put('/login', loginCtrl);
accountRouter.post('/register', registerCtrl);
accountRouter.put('/admin-login', adminLoginCtrl);
accountRouter.post('/admin-register', adminRegisterCtrl);
