import { Router } from 'express';
import { studentController } from '../controllers/studentController'

class StudentRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', studentController.list);
        this.router.get('/:id', studentController.getOne);
        this.router.get('/group/:id/:date', studentController.getByCourse);
        this.router.get('/group/:id', studentController.getByCourseDetails);
        this.router.get('/graphs/stats', studentController.countPerWard);
        this.router.post('/add/:cid', studentController.create);
        this.router.put('/delete/:id', studentController.delete);
        this.router.put('/:id', studentController.update);
    }
}

const studentRoutes = new StudentRoutes();
export default studentRoutes.router;