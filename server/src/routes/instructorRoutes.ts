import { Router } from 'express';
import { instructorController } from '../controllers/instructorController';

class InstructorRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', instructorController.list);
        this.router.get('/:id', instructorController.getOne)
        this.router.post('/', instructorController.create);
        this.router.put('/delete/:id', instructorController.delete);
        this.router.put('/:id', instructorController.update);
    }
}

const instructorRoutes = new InstructorRoutes();
export default instructorRoutes.router;