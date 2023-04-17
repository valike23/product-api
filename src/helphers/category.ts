import { Knex } from "../database/db";


export class Category {
    constructor(){

    }
    async save(categories: Icategory[]){
        try {
            const resp = await Knex('categories').insert(categories);
            return {status:200, msg: 'success',  data: resp}
        } catch (error) {
            console.log(error);
            return { status: 503, msg: 'something went wrong', error }
        }
    }

    async getCategory() {
        try {
            let categories = await Knex("categories");
            return categories;
        } catch (error) {
            console.log(error);
            return [];
        }
    }
    async getAllProductsInCategory(categoryId: number) {
        try {
            let categories = await Knex.select('*')
            .from('products')
            .where('category_id', categoryId);
            return categories;
        } catch (error) {
            console.log(error);
            return [];
        }
    }
    
}

export interface Icategory {
    id?: number;
    name?: string;
    slug?: string;
}