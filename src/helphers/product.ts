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
        this.slug = product.slug ? product.slug : '';
        this.author = product.author ? product.author : 0;
        this.shortDesc = product.short_desc ? product.short_desc : '';
    }

    async save() {
        try {
            const resp = await Knex("products").insert({
                name: this.name,
                slug: this.slug,
                short_desc: this.shortDesc,
                author: this.author
            });
            return { resp, status: 'success' }
        } catch (error) {
            return { error, status: 'failed' }
        }
    }
    async addSize(variantId: number, size: Isize) {
        try {
            size.variant_id = variantId;
            const resp = await Knex("sizes").insert(size);
            return { resp, status: 'success' }
        } catch (error) {
            return { error, status: 'failed' }
        }
    }
    async addMedia(product_id: number, media: Imedia) {
        try {
            media.product_id = product_id;
            const resp = await Knex("media").insert(media);
            return { resp, status: 'success' }
        } catch (error) {
            return { error, status: 'failed' }
        }
    }
    async addVariation(productID: number, variant: Ivariant) {
        try {
            variant.product_id = productID;
            const resp = await Knex("variants").insert(variant);
            return { resp, status: 'success' }
        } catch (error) {
            return { error, status: 'failed' }
        }
    }
    async retrieveProducts() {
        try {
            let resp = await Knex("products").select("products.id", "variants.id as variant_id", "products.slug"
            ,"products.name", "variants.color", "products.price","products.stock","products.author","variants.color_name")
                .leftJoin("variants", "variants.product_id", "products.id")
                .groupBy("products.id");
            const products = resp.map((row) => {
                const product: any = {
                    id: row.id,
                    name: row.name,
                    description: row.description,
                    price: row.price,
                    slug: row.slug,
                    stock: row.stock,
                    // Add any other columns you want from the products table here
                    variants: [],
                };

                if (row.variant_id) {
                    product.variants.push({
                        id: row.variant_id,
                        product_id: row.product_id,
                        color: row.color,
                        color_name: row.color_name
                        // Add any other columns you want from the variants table here
                    });
                }

                return product;
            });

            console.log('this resp', products);
            return { products, status: 'success' }
        } catch (error) {
            return { error, status: 'failed' }
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

export interface Imedia{
    width?: number;
    height?: number;
    url: string;
    type?: string;
    public_id?: string;
    product_id?: number;
}