import { Response,  Request } from "express"
import { Admin } from "../helphers/admin";
import { Auth } from "../helphers/users";


export const loginCtrl = (req: Request, res: Response) =>{
    const {email, password} = req.body;
    const authHelpher = new Auth(email, password);
    return authHelpher.login(res);
}


export const registerCtrl = (req: Request, res: Response) =>{
    const {email, password, name} = req.body;
    const authHelpher = new Auth(email, password, name);
      return authHelpher.register(res);
}

export const adminLoginCtrl = (req: Request, res: Response) =>{
    const {email, password} = req.body;
    const adminHelper = new Admin(email, password);
    return adminHelper.login(res);
}


export const adminRegisterCtrl = (req: Request, res: Response) =>{
    const {email, password, name} = req.body;
    const authHelpher = new Admin(email, password, name);
      return authHelpher.register(res);
}

export const getAllUserCtrl = async (req: Request, res: Response) => {
    let { page, limit, searchQuery } = req.query;
    const auth = new Auth();
    res.json(await auth.getUsers(page as unknown as number,
        limit as unknown as number,
        searchQuery as unknown as string));
}


