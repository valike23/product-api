import {Router} from 'express';
import { adminLoginCtrl, adminRegisterCtrl, getAllUserCtrl, loginCtrl, registerCtrl } from '../controllers/accountsCtrl';
import { Admin } from '../helphers/admin';

export const  accountRouter = Router();

accountRouter.put('/login', loginCtrl);
accountRouter.post('/register', registerCtrl);
accountRouter.put('/admin/login', adminLoginCtrl);
accountRouter.post('/admin/register', adminRegisterCtrl);
accountRouter.get('/all_users',Admin.authMiddleware, getAllUserCtrl);
