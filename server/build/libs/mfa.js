"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleMFA = void 0;
const speakeasy_1 = __importDefault(require("speakeasy"));
class GoogleMFA {
    constructor() {
        this.qrCodeImage = {};
    }
    generateSecret() {
        const secret = speakeasy_1.default.generateSecret({
            name: 'English Connnect Attendance System'
        });
        this.secret = secret;
        return this.secret;
    }
}
exports.GoogleMFA = GoogleMFA;
