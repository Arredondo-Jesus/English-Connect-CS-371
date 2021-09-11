import { Router } from 'express';
import {  userController } from '../controllers/userController'

class UserRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', userController.listAllUsers);
        this.router.get('/list', userController.list);
        this.router.get('/:uid', userController.getOne);
        this.router.get('/search/:uid', userController.getUserById);
        this.router.get('/search/email/:email', userController.getUserByEmail);
        this.router.get('/permissions/:email', userController.getUserPermissions);
        this.router.get('/roles/info', userController.listRoles);
        this.router.post('/update/:uid', userController.updateUser);
        this.router.post('/', userController.create);
        this.router.delete('/delete/:id', userController.deleteUserDB);
        this.router.delete('/deleteuserDB/:uid', userController.deleteUserFirebase);
        this.router.put('/:uid', userController.update);
    }
}

const userRoutes = new UserRoutes();
export default userRoutes.router;