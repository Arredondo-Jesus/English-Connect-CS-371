import { Router } from 'express';
import { attendanceController } from '../controllers/attendanceController';

class AttendanceRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/group/:id', attendanceController.listByDate);
        this.router.get('/register/:id', attendanceController.getGroup);
        this.router.get('/edit/:id/:date', attendanceController.getAttendanceByGroup);
        this.router.put('/edit/:id', attendanceController.update);
        this.router.get('/:id', attendanceController.getOne)
        this.router.post('/', attendanceController.create);
        this.router.delete('/:id', attendanceController.delete);
        this.router.put('/:id', attendanceController.update);
    }
}

const attendanceRoutes = new AttendanceRoutes();
export default attendanceRoutes.router;