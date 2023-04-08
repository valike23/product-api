import {v2 as cloudinary} from 'cloudinary';
export class Cloudinary {
   private cloud_name = process.env.CLOUDINARY_NAME;
   private key = process.env.CLOUDINARY_KEY;
   private secret= process.env.CLOUDINARY_SECRET;
    constructor(){
        cloudinary.config({
            cloud_name: this.cloud_name,
            api_secret: this.secret,
            api_key: this.key
        })
    }

    async uploadContent(path: string){
        const result = await cloudinary.uploader.upload(path);
          return result;
    }
}