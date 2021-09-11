import speakeasy from 'speakeasy';
import qrcode from 'qrcode';

export class GoogleMFA {
    constructor() {}

    qrCodeImage : any = {};
    secret: any;

    generateSecret() {

        const secret = speakeasy.generateSecret({
            name: 'English Connnect Attendance System'
        })
        this.secret = secret;
        return this.secret;
    }
}
