"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const courseController_1 = require("../controllers/courseController");
const multer_1 = __importDefault(require("../libs/multer"));
class CourseRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', courseController_1.courseController.list);
        this.router.get('/:id', courseController_1.courseController.getOne);
        this.router.post('/', courseController_1.courseController.create);
        this.router.put('/delete/:id', courseController_1.courseController.delete);
        this.router.put('/:id', courseController_1.courseController.update);
        this.router.delete('/uploaded', courseController_1.courseController.deleteTable);
        this.router.route('/upload')
            .post(multer_1.default.single('csv'), courseController_1.courseController.uploadCsv);
    }
}
const courseRoutes = new CourseRoutes();
exports.default = courseRoutes.router;
