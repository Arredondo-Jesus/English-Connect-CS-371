import {Request , Response} from 'express';
import pool from '../database2';
import * as admin from 'firebase-admin';
import { environment } from '../environment';

var app = admin.initializeApp({
    credential: admin.credential.cert(environment.firebase),
    databaseURL: "https://english-connect-64693.firebaseio.com"
});

class UserController {

    public async list (req: Request, res: Response){
        const courses = await pool.query(`SELECT u.uid, u.email,
                                          r.name AS 'roleName',
                                          r.id AS 'role'
                                          FROM user u
                                          JOIN role r ON r.id = u.role`);
        res.json(courses);
    }

    public async listRoles (req: Request, res: Response){
      const courses = await pool.query(`SELECT * FROM role`);
      res.json(courses);
  }
    
    public async getOne (req: Request, res: Response): Promise<any>{
        const { uid } = req.params;
        const user = await pool.query(`SELECT u.uid, 
                                              u.email,
                                              r.name AS 'roleName',
                                              r.id AS 'role'
                                       FROM user u
                                       JOIN  role r ON u.role = r.id
                                       WHERE u.uid = ?`, [uid]);
        res.json(user);

    }

    public async getUserByEmail (req: Request, res: Response) {
      const email  = req.params.email;
      const users = await pool.query(`SELECT * FROM user u WHERE u.email = ?`, [email]);
      res.json(users);
    }

    
    public async create (req: Request, res: Response): Promise <void>{
          await pool.query('INSERT INTO user set ?', [req.body]);
          res.json({message: 'User saved'});
    }

    public async delete (req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        await pool.query(`UPDATE user SET status = ? WHERE id = ?`, [req.body.status, id]);
        res.json({text: 'User ' + id + ' was deleted successfully'});
    }

    public async update (req: Request, res: Response){
        const { uid } = req.params;
        await pool.query('UPDATE user SET ? WHERE uid = ?', [req.body, uid]);
        res.json({text: 'User ' + uid + ' was updated successfully'});
    }

    public async getUserById(req: Request, res: Response) {
        const { uid } = req.params;
        await app.auth().getUser(uid)
            .then((userRecord) => {
            // See the UserRecord reference doc for the contents of userRecord.
            res.json(JSON.stringify(userRecord));
        })
        .catch((error) => {
            res.json(error);
        });
    }

    public async updateUser(req: Request, res: Response) {
        const { uid } = req.params;
        await app.auth().updateUser(uid, {
            email: req.body.email,
            disabled: req.body.disabled,
            password: req.body.password 
          })
            .then((userRecord) => {
              // See the UserRecord reference doc for the contents of userRecord.
              res.json(JSON.stringify(userRecord));
            })
            .catch((error) => {
              res.json(error);
            });
    }
    
    public async listAllUsers(req: Request, res: Response) {
      let userList: any = [];  
      // List batch of users, 1000 at a time.
        admin.auth().listUsers(1000)
        .then((listUsersResult)  => {
          listUsersResult.users.forEach((userRecord) => {
            userList.push(userRecord.toJSON());
          });
          console.log(userList);
          res.json(userList);
        })
        .catch(function(error) {
          console.log('Error listing users:', error);
        });
    }

    public async getUserPermissions(req: Request, res: Response) {
      const { email } = req.params;
      const user = await pool.query(`SELECT u.email,
                                            p.access,
                                            p.section,
                                            p.link,
                                            r.id,
                                            r.name,
                                            p.place,
                                            p.group
                                    FROM user u
                                    JOIN role r ON r.id = u.role
                                    JOIN permissions p ON r.id = p.role 
                                    WHERE u.email = ?
                                    ORDER BY place`, [email]);
      res.json(user);
    }

    public async deleteUserFirebase(req: Request, res: Response){
        const { uid } = req.params;
        admin.auth().deleteUser(uid)
        .then(() =>{
          console.log('Successfully deleted user');
        })
        .catch((error) =>{
          console.log('Error deleting user:', error);
        });
        }

        public async deleteUserDB(req: Request, res: Response) {
          const { id } = req.params;
          await pool.query(`DELETE FROM user WHERE uid = ?`, [id]);
          res.json({text: 'User deleted' + id});
        }
    
    }
export const userController = new UserController();
