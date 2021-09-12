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
exports.studentController = void 0;
const database_1 = __importDefault(require("../database"));
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const csv = __importStar(require("fast-csv"));
const fs_1 = __importDefault(require("fs"));
const encryptService = __importStar(require("../libs/encrypt"));
class StudentController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const students = yield database_1.default.query(`SELECT s.id,	
                                            s.name,
                                            s.last_name,
                                            s.email, 
                                            s.phone,
                                            s.status,
                                            SUM(CASE WHEN a.attendance_value = 1 THEN a.attendance_value = 1 ELSE 0 END) AS 'yes',
                                            SUM(CASE WHEN a.attendance_value = 0 THEN a.attendance_value = 0 ELSE 0 END) AS 'no',
                                            s.stake,
                                            s.course_id
                                            FROM student s
                                            LEFT JOIN attendance a ON a.student_id = s.id
                                            JOIN course c ON c.id = s.course_id
                                            WHERE s.status = 'active'
                                            GROUP BY s.id`);
            res.json(students);
        });
    }
    getInactiveStudents(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const students = yield database_1.default.query(`SELECT s.id,	
                                            s.name,
                                            s.last_name,
                                            s.email, 
                                            s.phone,
                                            s.status,
                                            SUM(CASE WHEN a.attendance_value = 1 THEN a.attendance_value = 1 ELSE 0 END) AS 'yes',
                                            SUM(CASE WHEN a.attendance_value = 0 THEN a.attendance_value = 0 ELSE 0 END) AS 'no',
                                            s.stake,
                                            s.course_id
                                            FROM student s
                                            LEFT JOIN attendance a ON a.student_id = s.id
                                            JOIN course c ON c.id = s.course_id
                                            WHERE s.status = 'inactive'
                                            GROUP BY s.id`);
            res.json(students);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const course = yield database_1.default.query(`SELECT s.id,	
                                        s.name,
                                        s.last_name,
                                        s.phone,
                                        s.email,
                                        s.status,
                                        s.stake,
                                        s.course_id
                                        FROM student s
                                        WHERE status = 'active' 
                                        AND id = ?`, [id]);
            if (course.length > 0) {
                return res.json(course[0]);
            }
            res.status(404).json(res.json({ text: 'Student was not found' }));
        });
    }
    getByCourse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { date } = req.params;
            const query = `SELECT a.date,
                s.id,
                s.name,
                s.last_name,
                a.attendance_value,
                a.date,
                a.lesson,
                s.course_id
        FROM attendance a 
        JOIN student s ON a.student_id = s.id
        JOIN course c ON s.course_id = c.id
        WHERE c.id = ?
        AND  a.date = ?
        AND a.status = 'active'
        ORDER BY a.attendance_value`;
            const students = yield database_1.default.query(query, [id, date]);
            res.json(students);
        });
    }
    getByCourseDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const query = `SELECT s.id,	
                        s.name,
                        s.last_name,
                        s.phone,
                        s.email,
                        s.status,
                        SUM(CASE WHEN a.attendance_value = 1 THEN a.attendance_value = 1 ELSE 0 END) AS 'yes',
                        SUM(CASE WHEN a.attendance_value = 0 THEN a.attendance_value = 0 ELSE 0 END) AS 'no',
                        s.course_id
                        FROM student s
                        LEFT JOIN attendance a ON a.student_id = s.id
                        JOIN course c ON c.id = s.course_id
                        WHERE c.id = ?
                        AND s.status = 'active'
                        GROUP BY s.id`;
            const students = yield database_1.default.query(query, [id]);
            res.json(students);
        });
    }
    countPerWard(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const students = yield database_1.default.query(`SELECT count(s.id) AS 'Total',
                                                  s.stake,
                                                  s.status
                                            FROM student s
                                            WHERE s.status = 'active'
                                            GROUP BY s.stake  
                                            ORDER BY s.stake`);
            res.json(students);
        });
    }
    attendancePerWard(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const students = yield database_1.default.query(`SELECT s.course_id,
                                                    i.name AS 'instructor_name',
                                                    i.last_name AS 'instructor_last_name',
                                                    ROUND(AVG(a.attendance_value) * 100, 0) AS 'Yes',
                                                    100 - ROUND(AVG(a.attendance_value) * 100, 0) AS 'No'
                                            FROM attendance a
                                            RIGHT OUTER JOIN student s ON a.student_id = s.id
                                            JOIN course c ON s.course_id = c.id
                                            JOIN instructor i ON i.id = c.instructor_id
                                            GROUP BY s.course_id
                                            ORDER BY Yes DESC`);
            res.json(students);
        });
    }
    attendancePerStudent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //TODO      
            const students = yield database_1.default.query(`SELECT c.id AS 'class_id',
                                                c.name AS 'class_name',
                                                c.level,
                                                c.day_1,
                                                c.time_1,
                                                c.day_2,
                                                c.time_2,
                                                c.generation,
                                                s.id AS 'student_id',
                                                s.name,
                                                s.last_name,
                                                i.name AS 'instructor_name',
                                                i.last_name AS 'instructor_last_name',
                                                ROUND(AVG(a.attendance_value) * 100, 0) AS 'Yes',
                                                100 - ROUND(AVG(a.attendance_value) * 100, 0) AS 'No'
                                        FROM course c
                                        JOIN student s ON s.course_id = c.id
                                        JOIN attendance a ON a.student_id = s.id
                                        JOIN instructor i ON c.instructor_id = i.id
                                        GROUP BY c.id
                                        ORDER BY Yes DESC`);
            res.json(students);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.body.name = req.body.name.trim();
            req.body.last_name = req.body.last_name.trim();
            req.body.id = req.body.name.substring(0, 1) + req.body.last_name.substring(0, 1) + req.body.email.substring(0, 2) + req.body.stake.replace(/\s+/g, '');
            req.body.id = req.body.id.toUpperCase();
            yield database_1.default.query(`INSERT INTO student 
        set id = ?, 
        name = ?,
        last_name = ?,
        phone = ?,
        email = ?,
        stake = ?,
        course_id = ?`, [req.body.id,
                req.body.name,
                req.body.last_name,
                req.body.phone,
                req.body.email,
                req.body.stake,
                req.body.course_id]);
            res.json({ message: 'Student saved' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE student SET status = ? WHERE id = ?', [req.body, id]);
            res.json({ text: 'Student ' + id + ' was deleted successfully' });
        });
    }
    activate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE student SET status = ? WHERE id = ?', [req.body.status, id]);
            res.json({ text: 'Student ' + id + ' was activated successfully' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query(`UPDATE student set 
        name = ?,
        last_name = ?,
        phone = ?,
        email = ?,
        stake = ?,
        course_id = ?
        WHERE id = ?`, [req.body.name,
                req.body.last_name,
                req.body.phone,
                req.body.email,
                req.body.stake,
                req.body.course_id, id]);
            res.json({ text: 'Student ' + id + ' was updated successfully' });
        });
    }
    uploadCsv(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //Print result from file upload to console
            const encrypt = new encryptService.EncryptService();
            //Read Uploaded File
            yield fs_1.default.createReadStream(path_1.default.resolve(req.file.path))
                .pipe(csv.parse({ headers: [
                    'id',
                    'name',
                    'last_name',
                    'email',
                    'phone',
                    'stake',
                    'course_id'
                ], ignoreEmpty: true, skipRows: 1 }))
                .on('error', error => console.error(error))
                .on('data', row => {
                row.name = row.name.trim();
                row.last_name = row.last_name.trim();
                row.id = row.name.substring(0, 1) + row.last_name.substring(0, 1) + row.email.substring(0, 2) + row.stake.replace(/\s+/g, '');
                row.id = row.id.toUpperCase();
                row.name = encrypt.encryptData(row.name);
                row.last_name = encrypt.encryptData(row.last_name);
                row.phone = encrypt.encryptData(row.phone);
                row.email = encrypt.encryptData(row.email);
                // Insert record in database
                database_1.default.query(`INSERT INTO student 
                            set id = ?, 
                            name = ?,
                            last_name = ?,
                            phone = ?,
                            email = ?,
                            stake = ?,
                            course_id = ?`, [row.id,
                    row.name,
                    row.last_name,
                    row.phone,
                    row.email,
                    row.stake,
                    row.course_id]);
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
            yield database_1.default.query('DELETE FROM student');
            return res.json({ text: 'The database was deleted successfully ' });
        });
    }
}
exports.studentController = new StudentController();
