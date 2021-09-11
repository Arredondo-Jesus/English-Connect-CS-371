"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
class UserRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', userController_1.userController.listAllUsers);
        this.router.get('/list', userController_1.userController.list);
        this.router.get('/:uid', userController_1.userController.getOne);
        this.router.get('/search/:uid', userController_1.userController.getUserById);
        this.router.get('/permissions/:email', userController_1.userController.getUserPermissions);
        this.router.get('/roles/info', userController_1.userController.listRoles);
        this.router.post('/update/:uid', userController_1.userController.updateUser);
        this.router.post('/', userController_1.userController.create);
        this.router.delete('/delete/:id', userController_1.userController.deleteUserDB);
        this.router.delete('/deleteuserDB/:uid', userController_1.userController.deleteUserFirebase);
        this.router.put('/:uid', userController_1.userController.update);
    }
}
const userRoutes = new UserRoutes();
exports.default = userRoutes.router;
