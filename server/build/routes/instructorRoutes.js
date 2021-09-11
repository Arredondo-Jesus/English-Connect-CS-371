"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const instructorController_1 = require("../controllers/instructorController");
const multer_1 = __importDefault(require("../libs/multer"));
class InstructorRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', instructorController_1.instructorController.list);
        this.router.get('/:id', instructorController_1.instructorController.getOne);
        this.router.post('/', instructorController_1.instructorController.create);
        this.router.put('/delete/:id', instructorController_1.instructorController.delete);
        this.router.put('/:id', instructorController_1.instructorController.update);
        this.router.delete('/uploaded', instructorController_1.instructorController.deleteTable);
        this.router.route('/upload')
            .post(multer_1.default.single('csv'), instructorController_1.instructorController.uploadCsv);
    }
}
const instructorRoutes = new InstructorRoutes();
exports.default = instructorRoutes.router;
