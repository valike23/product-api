import { Request, Response } from "express";
import { Config, Iconfig } from "../helphers/config";
const config = new Config();

export async function addConfigCtrl(req:Request, res: Response){
    let myConfig : Iconfig = {
        property: Object.keys(req.body)[0],
        value:  req.body[Object.keys(req.body)[0]]
    }
    console.log(myConfig);
   let data = await config.addConfig(myConfig);
   if(data?.status == 200){
    res.json(data);
}
else{
    res.status(data?.status as number).json(data);
}
}

export async function getConfigCtrl(req:Request, res: Response){
    res.json(await config.returnConfig(req.query.property as string));
}