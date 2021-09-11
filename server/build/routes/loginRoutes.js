"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loginController_1 = require("../controllers/loginController");
class LoginRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', loginController_1.loginController.index);
        this.router.get('/qr', loginController_1.loginController.generateMFAQRCode);
        this.router.post('/verifytoken', loginController_1.loginController.verifyToken);
        this.router.post('/secret/update', loginController_1.loginController.update);
    }
}
const loginRoutes = new LoginRoutes();
exports.default = loginRoutes.router;
