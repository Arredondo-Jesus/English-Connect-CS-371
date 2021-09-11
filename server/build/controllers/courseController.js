"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseController = void 0;
const database_1 = __importDefault(require("../database"));
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const csv = __importStar(require("fast-csv"));
const fs_1 = __importDefault(require("fs"));
const encryptService = __importStar(require("../libs/encrypt"));
const decryptService = __importStar(require("../libs/decrypt"));
class CourseController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const courses = yield database_1.default.query(`SELECT c.id,
                                            SUM(IF(s.status = 'active',1,0)) AS 'count',
                                            c.name,
                                            c.level,
                                            c.day_1,
                                            c.day_2,
                                            c.time_1,
                                            c.time_2,
                                            c.generation,
                                            c.status,
                                            c.start,
                                            c.instructor_id,
                                            i.name AS 'instructor_name',
                                            i.last_name AS 'instructor_last_name',
                                            i.email AS 'instructor_email'
                                        FROM course c
                                        LEFT OUTER JOIN student s ON s.course_id = c.id
                                        LEFT OUTER JOIN instructor i ON i.id = c.instructor_id
                                        WHERE c.status = 'active'
                                        GROUP BY c.id
                                        ORDER BY c.generation DESC`);
            res.json(courses);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const course = yield database_1.default.query(`SELECT * FROM course WHERE id=?`, [id]);
            if (course.length > 0) {
                return res.json(course[0]);
            }
            res.status(404).json(res.json({ text: 'Course was not found' }));
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query(`INSERT INTO course
                            (id, 
                            name,
                            level,
                            day_1,
                            time_1,
                            day_2,
                            time_2,
                            generation,
                            start,
                            instructor_name,
                            instructor_last_name,
                            instructor_id) 
                          SELECT ?, ?, ?, ?, ?, ?, ?, ?, ?, i.name, i.last_name, ? 
                          FROM instructor i 
                          WHERE i.id = ?`, [req.body.id,
                req.body.name,
                req.body.level,
                req.body.day_1,
                req.body.time_1,
                req.body.day_2,
                req.body.time_2,
                req.body.generation,
                req.body.start,
                req.body.instructor_id,
                req.body.instructor_id]);
            res.json({ message: 'Course saved' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query(`UPDATE course SET status = ? WHERE id = ?`, [req.body.status, id]);
            res.json({ text: 'Course ' + id + ' was deleted successfully' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query(`UPDATE course 
                          SET id = ?,
                              name = ?,
                              level = ?,
                              day_1 = ?,
                              time_1 = ?,
                              day_2 = ?,
                              time_2 = ?,
                              generation = ?,
                              start = ?,
                              instructor_name = (SELECT name FROM instructor i WHERE i.id = ?),
                              instructor_last_name = (SELECT last_name FROM instructor i WHERE i.id = ?),
                              instructor_id = (SELECT id FROM instructor i WHERE i.id = ?)
                          WHERE id = ?`, [req.body.id,
                req.body.name,
                req.body.level,
                req.body.day_1,
                req.body.time_1,
                req.body.day_2,
                req.body.time_2,
                req.body.generation,
                req.body.start,
                req.body.instructor_id,
                req.body.instructor_id,
                req.body.instructor_id, id]);
            res.json({ text: 'Course ' + id + ' was updated successfully' });
        });
    }
    uploadCsv(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //Print result from file upload to console
            console.log('Saving file');
            console.log(req.file);
            const encrypt = new encryptService.EncryptService();
            const decrypt = new decryptService.DecryptService();
            //Read Uploaded File
            yield fs_1.default.createReadStream(path_1.default.resolve(req.file.path))
                .pipe(csv.parse({ headers: ['id',
                    'name',
                    'level',
                    'day_1',
                    'time_1',
                    'day_2',
                    'time_2',
                    'generation',
                    'start',
                    'instructor_name',
                    'instructor_last_name',
                    'instructor_id'], ignoreEmpty: true, skipRows: 1 }))
                .on('error', error => console.error(error))
                .on('data', row => {
                row.instructor_name = row.instructor_name.trim();
                row.instructor_last_name = row.instructor_last_name.trim();
                row.instructor_id = row.instructor_name.substring(0, 2) + row.instructor_last_name.substring(0, 3);
                row.instructor_id = row.instructor_id.toUpperCase();
                let name = encrypt.encryptData(row.instructor_name);
                let last_name = encrypt.encryptData(row.instructor_last_name);
                database_1.default.query(`INSERT INTO course
                            set id = ?,
                            name = ?,
                            level = ?,
                            day_1 = ?,
                            time_1 = ?,
                            day_2 = ?,
                            time_2 = ?,
                            generation = ?,
                            start = ?,
                            instructor_name = ?, 
                            instructor_last_name = ?,
                            instructor_id = ?`, [row.id,
                    row.name,
                    row.level,
                    row.day_1,
                    row.time_1,
                    row.day_2,
                    row.time_2,
                    row.generation,
                    row.start,
                    name,
                    last_name,
                    row.instructor_id]);
                console.log(row);
            })
                .on('end', (rowCount) => console.log(`Parsed ${rowCount} rows`));
            //Delete Physical File
            if (req.file.path) {
                yield fs_extra_1.default.unlinkSync(path_1.default.resolve(req.file.path));
            }
            //Return Response of processing file
            return res.json({
                message: 'File Successfully Saved',
                file: req.file
            });
        });
    }
    //Delete Database
    deleteTable(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('DELETE FROM course');
            return res.json({ text: 'The database was deleted successfully ' });
        });
    }
}
exports.courseController = new CourseController();
