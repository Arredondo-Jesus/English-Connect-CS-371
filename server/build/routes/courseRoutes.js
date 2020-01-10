"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const courseController_1 = require("../controllers/courseController");
class CourseRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', courseController_1.courseController.list);
        this.router.get('/:id', courseController_1.courseController.getOne);
        this.router.post('/', courseController_1.courseController.create);
        this.router.put('/delete/:id', courseController_1.courseController.delete);
        this.router.put('/:id', courseController_1.courseController.update);
    }
}
const courseRoutes = new CourseRoutes();
exports.default = courseRoutes.router;
