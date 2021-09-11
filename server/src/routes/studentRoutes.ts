import { Router } from 'express';
import { studentController } from '../controllers/studentController'
import multer from '../libs/multer';

class StudentRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', studentController.list);
        this.router.get('/inactive', studentController.getInactiveStudents);
        this.router.get('/:id', studentController.getOne);
        this.router.get('/group/:id/:date', studentController.getByCourse);
        this.router.get('/graphs/attendanceperward', studentController.attendancePerWard);
        this.router.get('/group/:id', studentController.getByCourseDetails);
        this.router.get('/graphs/stats', studentController.countPerWard);
        this.router.get('/reports/attendanceperstudent', studentController.attendancePerStudent);
        this.router.post('/add/:cid', studentController.create);
        this.router.put('/delete/:id', studentController.delete);
        this.router.put('/activate/:id', studentController.activate);
        this.router.put('/:id', studentController.update);
        this.router.delete('/upload', studentController.deleteTable);
        this.router.route('/upload')
        .post(multer.single('csv'), studentController.uploadCsv);
    }
}

const studentRoutes = new StudentRoutes();
export default studentRoutes.router;