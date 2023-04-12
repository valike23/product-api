import { Knex } from "../database/db";

export class Order {
    
    constructor(){

    }

    async getAllOrdersForUser(userId: number) {
        try {
         let orders = await  Knex("orders").where({user_Id: userId});
         return orders;
        } catch (error) {
            console.log(error);
            return [];
        }
    }
}
enum EorderStatus {
    CREATED= 'created',
    ACCEPTED= 'accepted',
    SHIPPED = 'shipped',
    DELIVERED = 'delivered'
}
export interface Iorder {
    id?: number;
    orderID: string;
    status: EorderStatus.CREATED,
    shipping?: string
}