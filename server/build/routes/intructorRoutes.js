"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class InstructorRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', (req, res) => res.send('Instructor'));
    }
}
const instructorRoutes = new InstructorRoutes();
exports.default = instructorRoutes.router;
