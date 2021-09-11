"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const instructorController_1 = require("../controllers/instructorController");
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
    }
}
const instructorRoutes = new InstructorRoutes();
exports.default = instructorRoutes.router;
