"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const encryptedText = {
    message: '',
    encrypted: ''
};
let iv = crypto_1.default.randomBytes(16);
let key = '&F)J@NcRfUjXn2r5u8x/A%D*G-KaPdSg';
let cipher = crypto_1.default.createCipheriv('aes-192-cbc', key, iv);
let encrypted = cipher.update(encryptedText.message, 'utf8', 'hex');
encrypted += cipher.final('hex');
encryptedText.encrypted = encrypted;
exports.default = encryptedText;
