import { randomUUID } from "crypto";
import { Knex } from "../database/db";
interface IOrder {
    id: number;
    orderID: string;
    status: string;
    shipping: string;
    userId: number;
    user: {
        id: number;
        name: string;
        email: string;
        password: string;
    };
    products: {
        id: number;
        name: string;
        slug: string;
        price: number;
    }[];
}
export class Order {

    constructor() {

    }
    async getOrdersByStatus(status: string): Promise<any[]> {
    const orders = await Knex('orders')
        .select(
            'orders.id as id',
            'orders.orderID as orderID',
            'orders.status as status',
            'orders.shipping as shipping',
            'orders.user_id as userId',
            'users.id as user.id',
            'users.name as user.name',
            'users.email as user.email',
            'users.password as user.password',
            'products.id as products.id',
            'products.name as products.name',
            'products.slug as products.slug',
            'products.price as products.price'
        )
        .join('users', 'orders.user_id', '=', 'users.id')
        .join('order_products', 'orders.id', '=', 'order_products.order_id')
        .join('products', 'order_products.product_id', '=', 'products.id')
        .where('orders.status', status);

    const ordersWithProducts = orders.reduce((acc: IOrder[], order: any) => {
        const existingOrder = acc.find((o) => o.id === order.id);
        if (existingOrder) {
            existingOrder.products.push({
                id: order['products.id'],
                name: order['products.name'],
                slug: order['products.slug'],
                price: order['products.price'],
            });
        } else {
            acc.push({
                id: order.id,
                orderID: order.orderID,
                status: order.status,
                shipping: order.shipping,
                userId: order.userId,
                user: {
                    id: order['user.id'],
                    name: order['user.name'],
                    email: order['user.email'],
                    password: order['user.password'],
                },
                products: [
                    {
                        id: order['products.id'],
                        name: order['products.name'],
                        slug: order['products.slug'],
                        price: order['products.price'],
                    },
                ],
            });
        }
        return acc;
    }, []);

    return ordersWithProducts;
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
        let products: any[] = [];
        orderdetails.products.forEach((p: any) => {
            let product = { order_id: orderData[0], product_id: p.id };
            products.push(product);
        });
        console.log(products);
        let resp = await this.addOrderProducts(products);

        if (resp) {
            return { status: 200, msg: 'success', orderData, data: resp }
        }
    } catch (error) {
        console.log(error);
        return { status: 503, msg: 'something went wrong', error }
    }
}

async updateOrderStatus(orderID: number, newStatus: string){
    try {
        
      const data = await  Knex('orders')
        .where('id', orderID) 
        .update({ status: newStatus }) ;
        return { status: 200, msg: 'success', data }
    } catch (error) {
        console.log(error);
        return { status: 503, msg: 'something went wrong', error }
    }
  
}
   private async addOrderProducts(products: number[]){
    try {

        return await Knex("order_products").insert(products);


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