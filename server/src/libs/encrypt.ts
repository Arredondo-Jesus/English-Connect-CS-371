import * as crypto from 'crypto-js';

export class EncryptService {
  encrypted: any; 

  constructor() { }

  public encryptData(plainText: string){
    const key = '12345678123456781234567812345678';

    this.encrypted = crypto.AES.encrypt(plainText, key);
    return this.encrypted.toString();
  }


}