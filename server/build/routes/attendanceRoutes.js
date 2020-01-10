"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const attendanceController_1 = require("../controllers/attendanceController");
class AttendanceRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/group/:id', attendanceController_1.attendanceController.listByDate);
        this.router.get('/register/:id', attendanceController_1.attendanceController.getGroup);
        this.router.get('/edit/:id/:date', attendanceController_1.attendanceController.getAttendanceByGroup);
        this.router.put('/edit/:id', attendanceController_1.attendanceController.update);
        this.router.get('/:id', attendanceController_1.attendanceController.getOne);
        this.router.post('/', attendanceController_1.attendanceController.create);
        this.router.delete('/:id', attendanceController_1.attendanceController.delete);
        this.router.put('/:id', attendanceController_1.attendanceController.update);
    }
}
const attendanceRoutes = new AttendanceRoutes();
exports.default = attendanceRoutes.router;
