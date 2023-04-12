import { randomUUID } from "crypto";
import { Knex } from "../database/db";

export class Order {

    constructor() {

    }

    async getAllOrdersForUser(userId: number) {
        try {
            let orders = await Knex("orders").where({ user_Id: userId });
            return orders;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async addOrderToUser(userId: number, orderdetails: any) {
        try {
            let order: Iorder = {
                status: EorderStatus.CREATED,
                orderID: randomUUID(),
                shipping: orderdetails.shipping,
                user_id: userId
            };
            const orderData = await Knex('orders').insert(order);
            console.log(orderData);
            let products : any[] = [];
            orderdetails.products.forEach((p: any)=>{
                let product = {order_id: orderData[0], product_id: p.id};
                products.push(product);
            });
            console.log(products);
           let resp = await this.addOrderProducts(products);

            if (resp) {
                return {status:200, msg: 'success', orderData, data: resp}
            }
        } catch (error) {
            console.log(error);
            return { status: 503, msg: 'something went wrong', error }
        }
    }
   private async addOrderProducts( products: number[]){
        try {
          
          return await  Knex("order_products").insert(products);
          
            
        } catch (error) {
            return []
        }
    }
}


enum EorderStatus {
    CREATED = 'created',
    ACCEPTED = 'accepted',
    SHIPPED = 'shipped',
    DELIVERED = 'delivered'
}
export interface Iorder {
    id?: number;
    orderID: string;
    status: EorderStatus.CREATED,
    shipping?: string,
    user_id?: number
}