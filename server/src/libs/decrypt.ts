import * as crypto from 'crypto-js';

export class DecryptService {
  decrypted = ''; 

  constructor() { }

  decryptData(encryptedText: any){
    const key = '12345678123456781234567812345678';

    this.decrypted = crypto.AES.decrypt(encryptedText, key.trim()).toString(crypto.enc.Utf8);
    return this.decrypted.toString();
  }
}