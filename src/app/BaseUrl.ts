import { Injectable } from '@angular/core';

@Injectable({
   providedIn: 'root'
})
export class BaseUrl {
   // private baseUrl = 'http://192.168.43.119:3000/';
   private baseUrl = 'https://m1p11mean-niko-hajamalala-back.onrender.com';
   // private baseUrl = 'http://localhost:9008/api/v1';

   getBaseUrl(){
      return this.baseUrl;
   }
}