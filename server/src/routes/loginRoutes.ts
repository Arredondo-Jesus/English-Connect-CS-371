import { Router } from 'express';
import { loginController } from '../controllers/loginController';

class LoginRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', loginController.index);
        this.router.get('/qr', loginController.generateMFAQRCode);
        this.router.post('/verifytoken', loginController.verifyToken);
        this.router.post('/secret/update',loginController.update)
    }
}

const loginRoutes = new LoginRoutes();
export default loginRoutes.router;