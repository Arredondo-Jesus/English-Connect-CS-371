import {Request , Response} from 'express';
import * as MFA from '../libs/mfa';
import speakeasy from 'speakeasy';
import qrcode from 'qrcode';
import pool from '../database2';
class LoginController {

    public index (req: Request, res: Response){
        res.send('Hello');
    }

    public generateMFAQRCode (req: Request, res: Response){
        const googleMFA = new MFA.GoogleMFA()
        const secret = googleMFA.generateSecret();

        qrcode.toDataURL(secret.otpauth_url!, (error, data) => {
            return res.json({qrCodeImage: data, secret: secret});
        })
    }

    public verifyToken(req: Request, res: Response) {

        const verifyCode = speakeasy.totp.verify({
            secret: req.body.secret,
            encoding: 'ascii',
            token: req.body.token
        })
          

        return res.json({result: verifyCode});
    }

    public async update (req: Request, res: Response){
        const { secret } = req.params;
        const { uid } = req.params;
        await pool.query('UPDATE user SET secret = ? WHERE uid = ?', [secret, uid]);
        res.json({text: 'User ' + uid + ' was updated successfully'});
    }
}

export const loginController = new LoginController();
