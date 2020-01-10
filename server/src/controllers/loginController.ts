import {Request , Response} from 'express';

class LoginController {

    public index (req: Request, res: Response){
        res.send('Hello');
    }
}

export const loginController = new LoginController();
