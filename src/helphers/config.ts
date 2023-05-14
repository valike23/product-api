import { Knex } from "../database/db";

export class Config {
    constructor(){}

    async addConfig(config: Iconfig){
        try {
            const resp = await Knex('configs').insert(config);
            return {status:200, msg: 'success',  data: resp}
        } catch (error) {
            console.log(error);
            return { status: 503, msg: 'something went wrong', error }
        }
    }
    async returnConfig(property: string){
        try {
            const config = await Knex('configs').where({property});
            return {status:200, msg: 'success',  data: config} 
        } catch (error) {
            console.log(error);
            return { status: 503, msg: 'something went wrong', error }
        }
     
    }
    async editConfig(property: string, value: string) {
        try {
          const resp = await Knex("configs")
            .where({ property})
            .update({ value });
          return { status: 200, msg: "success", data: resp };
        } catch (error) {
          console.log(error);
          return { status: 503, msg: "something went wrong", error };
        }
      }
}

export interface Iconfig {
    id?: number;
    property: string;
    value: string;
}