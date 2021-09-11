import { Router } from 'express';
import { courseController } from '../controllers/courseController'
import multer from '../libs/multer';

class CourseRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', courseController.list);
        this.router.get('/:id', courseController.getOne)
        this.router.post('/', courseController.create);
        this.router.put('/delete/:id', courseController.delete);
        this.router.put('/:id', courseController.update);
        this.router.delete('/uploaded', courseController.deleteTable)
        this.router.route('/upload')
        .post(multer.single('csv'), courseController.uploadCsv);
    }
}

const courseRoutes = new CourseRoutes();
export default courseRoutes.router;