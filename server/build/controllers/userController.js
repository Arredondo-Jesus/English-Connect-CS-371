"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const database2_1 = __importDefault(require("../database2"));
const admin = __importStar(require("firebase-admin"));
const environment_1 = require("../environment");
var app = admin.initializeApp({
    credential: admin.credential.cert(environment_1.environment.firebase),
    databaseURL: "https://english-connect-64693.firebaseio.com"
});
class UserController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const courses = yield database2_1.default.query(`SELECT u.uid, u.email,
                                          r.name AS 'roleName',
                                          r.id AS 'role'
                                          FROM user u
                                          JOIN role r ON r.id = u.role`);
            res.json(courses);
        });
    }
    listRoles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const courses = yield database2_1.default.query(`SELECT * FROM role`);
            res.json(courses);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { uid } = req.params;
            const user = yield database2_1.default.query(`SELECT u.uid, 
                                              u.email,
                                              r.name AS 'roleName',
                                              r.id AS 'role'
                                       FROM user u
                                       JOIN  role r ON u.role = r.id
                                       WHERE u.uid = ?`, [uid]);
            res.json(user);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database2_1.default.query('INSERT INTO user set ?', [req.body]);
            res.json({ message: 'User saved' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database2_1.default.query(`UPDATE user SET status = ? WHERE id = ?`, [req.body.status, id]);
            res.json({ text: 'User ' + id + ' was deleted successfully' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { uid } = req.params;
            yield database2_1.default.query('UPDATE user SET ? WHERE uid = ?', [req.body, uid]);
            res.json({ text: 'User ' + uid + ' was updated successfully' });
        });
    }
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { uid } = req.params;
            yield app.auth().getUser(uid)
                .then((userRecord) => {
                // See the UserRecord reference doc for the contents of userRecord.
                res.json(JSON.stringify(userRecord));
            })
                .catch((error) => {
                res.json(error);
            });
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { uid } = req.params;
            yield app.auth().updateUser(uid, {
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
        });
    }
    listAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let userList = [];
            // List batch of users, 1000 at a time.
            admin.auth().listUsers(1000)
                .then((listUsersResult) => {
                listUsersResult.users.forEach((userRecord) => {
                    userList.push(userRecord.toJSON());
                });
                console.log(userList);
                res.json(userList);
            })
                .catch(function (error) {
                console.log('Error listing users:', error);
            });
        });
    }
    getUserPermissions(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.params;
            const user = yield database2_1.default.query(`SELECT u.email,
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
        });
    }
    deleteUserFirebase(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { uid } = req.params;
            admin.auth().deleteUser(uid)
                .then(() => {
                console.log('Successfully deleted user');
            })
                .catch((error) => {
                console.log('Error deleting user:', error);
            });
        });
    }
    deleteUserDB(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database2_1.default.query(`DELETE FROM user WHERE uid = ?`, [id]);
            res.json({ text: 'User deleted' + id });
        });
    }
}
exports.userController = new UserController();
