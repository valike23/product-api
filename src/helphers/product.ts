import { Knex } from "../database/db";

export class Product {
    id: number;
    name: string;
    slug: string;
    shortDesc: string;
    author: number;
    price?: number;
    salePrice?: number;
    stock?: number;

    sold?: number;
    variants: Ivariant[] = [];

    constructor(product: Iproduct) {
        this.id = product.id ? product.id : 0;
        this.name = product.name ? product.name : '';
        this.slug = product.slug? product.slug : '';
        this.author = product.author? product.author : 0;
        this.shortDesc = product.short_desc? product.short_desc: '';
    }

    async save(){
        try {
         const resp = await   Knex("products").insert({
                name: this.name,
                slug: this.slug,
                short_desc: this.shortDesc,
                author: this.author
            });
            return {resp, status: 'success'}
        } catch (error) {
            return {error, status: 'failed'}
        }
    }
    async retrieveProducts(){
        try {
          let resp = await  Knex("products");
          return {resp, status: 'success'}
        } catch (error) {
            return {error, status: 'failed'}
        }
    }
}

export interface Iproduct {
    id?: number;
    name?: string;
    author?: number;
    slug?: string;
    short_desc?: string;
    price?: number;
    sale_price?: number;
    stock?: number;
    sold?: number;
    variants?: Ivariant[]
}

export interface Ivariant {
    color?: string;
    color_name?: string;
    price: number;
    product_id: number;
    sizes?: Isize[]

}
export interface Isize {
    name: string;
    variant_id: number
}