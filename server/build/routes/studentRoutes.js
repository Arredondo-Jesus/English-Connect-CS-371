"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const studentController_1 = require("../controllers/studentController");
const multer_1 = __importDefault(require("../libs/multer"));
class StudentRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', studentController_1.studentController.list);
        this.router.get('/inactive', studentController_1.studentController.getInactiveStudents);
        this.router.get('/:id', studentController_1.studentController.getOne);
        this.router.get('/group/:id/:date', studentController_1.studentController.getByCourse);
        this.router.get('/graphs/attendanceperward', studentController_1.studentController.attendancePerWard);
        this.router.get('/group/:id', studentController_1.studentController.getByCourseDetails);
        this.router.get('/graphs/stats', studentController_1.studentController.countPerWard);
        this.router.get('/reports/attendanceperstudent', studentController_1.studentController.attendancePerStudent);
        this.router.post('/add/:cid', studentController_1.studentController.create);
        this.router.put('/delete/:id', studentController_1.studentController.delete);
        this.router.put('/activate/:id', studentController_1.studentController.activate);
        this.router.put('/:id', studentController_1.studentController.update);
        this.router.delete('/upload', studentController_1.studentController.deleteTable);
        this.router.route('/upload')
            .post(multer_1.default.single('csv'), studentController_1.studentController.uploadCsv);
    }
}
const studentRoutes = new StudentRoutes();
exports.default = studentRoutes.router;
