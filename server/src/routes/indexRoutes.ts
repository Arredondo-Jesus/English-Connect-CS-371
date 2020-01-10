import { Router } from 'express';
import { indexController } from '../controllers/indexController';

class IndexRouts {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', indexController.index);
    }
}

const indexRoutes = new IndexRouts();
export default indexRoutes.router;