import Crypt from "cryptr";
import { NextFunction, Response } from "express";
import { Knex } from "../database/db";
import { key } from "../public";
import jwt from "jsonwebtoken";


const crypt = new Crypt(key);
export class Admin {
    email: string = '';
    name: string = '';
    password: string = '';

    constructor(email: string, password: string, name: string = '') {
        this.email = email;
        this.name = name;
        this.password = password
    }


    async login(res: Response): Promise<any> {
      try {
        console.log(this.password, this.email);
        const user = await Knex("admin").where({ email: this.email }).select('*');
        if (!user.length) return res.json({ data: {}, msg: 'email  does not exist', status: 503 });
        console.log(user);
        user[0].role = 'admin';
        if (this.password != user[0].password) return res.json({ data: {}, msg: ' password does not exist', status: 503 });
        
        const token = Admin.generateToken(user[0]);
        return res.json({
            data: {
                token, user: user[0], role: 'admin'
            },
            msg: 'successful', status: 200
        })
      } catch (error) {
        console.log(error);
        res.status(503).json(error);
      }

    }
    async register(res: Response): Promise<any> {
        try {
            const user = await Knex("admin").insert({
                email: this.email,
                password: this.password, name: this.name
            }).select('*');
            console.log(user);
            return res.json({
                data: {
                    user,
                    role: 'admin'
                },
                msg: 'successful', status: 200
            })
        } catch (error) {
            console.log(error);
            res.status(503).json(error);
        }

    }

   static authMiddleware(req: any, res: Response, next: NextFunction) {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "Token not found",
            });
        }

        try {
            const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET!);
            console.log('decoded', decodedToken);
            if(decodedToken.type == 'admin'){
                req.user = decodedToken;
              return  next();
            }
            else{
                throw({});
            }

           
        } catch (error) {
            return res.status(401).json({ message: 'you are unauthorized' })

        }
    }

  static  generateToken(user: any): string {
        const token: string = jwt.sign(
            {
                id: user.id,
                email: user.email,
                type: 'admin'
            },
            process.env.JWT_SECRET!,
            {
                expiresIn: "1h",
            }
        );
        return token;
    };
}