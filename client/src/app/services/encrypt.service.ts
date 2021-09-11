import { Injectable } from '@angular/core';
import * as crypto from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptService {
  encrypted: any; 

  constructor() { }

  encryptData(plainText: string){
    const key = '12345678123456781234567812345678';

    this.encrypted = crypto.AES.encrypt(plainText, key);
    return this.encrypted.toString();
  }


}
