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
    featured?: Boolean;
    top?: Boolean;
    sold?: number;
    new?: Boolean;
    variants: Ivariant[] = [];
    category_id: number | null;

    constructor(product: Iproduct) {
        this.id = product.id ? product.id : 0;
        this.name = product.name ? product.name : '';
        this.slug = product.slug ? product.slug : '';
        this.author = product.author ? product.author : 0;
        this.shortDesc = product.short_desc ? product.short_desc : '';
        this.featured = product.featured ? product.featured : false;
        this.stock = product.stock? product.stock : 0;
        this.top = product.top ? product.top : false;
        this.price = product.price? product.price: 0;
        this.new = product.new? product.new: false,
        this.category_id = product.category_id ? product.category_id: null;
    }

    async save() {
        try {
            const resp = await Knex("products").insert({
                name: this.name,
                price: this.price,
                slug: this.slug,
                short_desc: this.shortDesc,
                author: this.author,
                featured: this.featured,
                top: this.top,
                stock:this.stock,
                category_id:this.category_id,
                new: this.new
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
            const products = await Knex('products')
    .select('products.id', 'products.name', 'products.price','products.slug','products.featured',
     'products.short_desc', 'products.new', 'products.until', 'products.top', 'products.ratings','products.stock',
     'products.review', 'categories.name as category', 'media.url as image')
    .leftJoin('categories', 'products.category_id', 'category.id')
    .leftJoin('media', 'products.media_id', 'media.id');

  const variations = await Knex('variants')
    .select('variants.product_id', 'variants.name as variation_name',  'variants.price as variation_price')
    .whereIn('variants.product_id', products.map((product) => product.id));

  const productsWithVariations = products.map((product) => {
    const productVariations = variations.filter((variation) => variation.product_id === product.id);

    return {
      ...product,
      variants: productVariations
    };
  });

   ;
            return {status:200, msg: 'success',  data: productsWithVariations} 
        } catch (error) {
            console.log(error);
            return { status: 503, msg: 'something went wrong', error }
        }
    }

    async retrieveVariants(product_id: number){
        try {
            const variants = await Knex('variants').where({product_id});
            return {status:200, msg: 'success',  data: variants} 
        } catch (error) {
            console.log(error);
            return { status: 503, msg: 'something went wrong', error }
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
    featured?: boolean;
    top?: boolean;
    new?: boolean;
    stock?: number;
    sold?: number;
    variants?: Ivariant[];
    category_id?: number;
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