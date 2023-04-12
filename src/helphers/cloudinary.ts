import {v2 as cloudinary} from 'cloudinary';
export class Cloudinary {
   private cloud_name = process.env.CLOUDINARY_NAME;
   private key = process.env.CLOUDINARY_KEY;
   private secret= process.env.CLOUDINARY_SECRET;
    constructor(){
        
    }

    async uploadContent(path: string){
        cloudinary.config({
            cloud_name: this.cloud_name,
            
            api_secret: this.secret,
            api_key: this.key
        })
        const timestamp = Math.round(Date.now() / 1000);
        console.log('path here', path);
const signature = cloudinary.utils.api_sign_request({ timestamp }, this.key || '');
        const result = await cloudinary.uploader.upload(path, {async: true});
          return result;
    }
}