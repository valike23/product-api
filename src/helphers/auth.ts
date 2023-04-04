import Crypt from "cryptr";
import { Response } from "express";
import { Knex } from "../database/db";
import { key } from "../public";


const crypt = new Crypt(key);
export class Auth {
    email: string = '';
    name: string = '';
    password: string = '';

    constructor(email: string, password: string, name: string = '') {
        this.email = email;
        this.name = name;
        this.password = password
    }


    async login(res: Response): Promise<any> {
        console.log(this.password, this.email);
        const user = await Knex("users").where({ email: this.email }).select('*');
        if (user.length < 1) return res.json({ data: {}, msg: 'email  does not exist', status: 503 });
        console.log('the user is working,',user);
        if (this.password != user[0].password) return res.json({ data: {}, msg: ' password does not exist', status: 503 });
        const token = crypt.encrypt(JSON.stringify(user));
        return res.json({
            data: {
                token,user: user[0]
            },
            msg: 'successful', status: 200
        })

    }
    async register(res: Response): Promise<any> {
        try {
            const user = await Knex("users").insert({
                email: this.email,
                password: this.password, name: this.name
            }).select('*');
            console.log(user);
            return res.json({
                data: {
                    user
                },
                msg: 'successful', status: 200
            })
        } catch (error) {
            console.log(error);
            res.status(503).json(error);
        }

    }
}