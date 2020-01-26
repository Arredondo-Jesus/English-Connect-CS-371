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
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class StudentController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const students = yield database_1.default.query(`SELECT	s.name,
                                                    s.last_name,
                                                    s.phone,
                                                    s.email,
                                                    s.age,
                                                    s.member,
                                                    s.ward,
                                                    s.status,
                                                    SUM(CASE
                                                    WHEN a.attendance_value = 'Yes' THEN 1
                                                    ELSE 0
                                                END) AS 'yes',
                                                SUM(CASE
                                                    WHEN a.attendance_value = 'No' THEN 1
                                                    ELSE 0
                                                END) AS 'no',
                                                SUM(CASE
                                                    WHEN a.attendance_value = 'No'  OR a.attendance_value = 'Yes' THEN 1
                                                    ELSE 0
                                                END) AS 'total'
                                            FROM student s
                                            JOIN attendance a ON s.id = a.student_id
                                            WHERE s.status = 'active' 
                                            GROUP BY a.student_id  
                                            ORDER BY Total  DESC`);
            res.json(students);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const course = yield database_1.default.query(`SELECT * FROM student WHERE status = 'active' AND id = ?`, [id]);
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
                s.name, 
                s.last_name, 
                a.attendance_value,
                a.date,
                a.lesson,
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
            const query = `SELECT	s.name,
                        s.last_name,
                        s.phone,
                        s.email,
                        s.age,
                        s.member,
                        s.ward,
                        s.status,
                        s.course_id,
                        SUM(CASE
                        WHEN a.attendance_value = 'Yes' THEN 1
                        ELSE 0
                    END) AS 'yes',
                    SUM(CASE
                        WHEN a.attendance_value = 'No' THEN 1
                        ELSE 0
                    END) AS 'no',
                    SUM(CASE
                        WHEN a.attendance_value = 'No'  OR a.attendance_value = 'Yes' THEN 1
                        ELSE 0
                    END) AS 'total'
                FROM student s
                JOIN attendance a ON s.id = a.student_id
                WHERE s.course_id = ?
                AND s.status = 'active'
                GROUP BY a.student_id  
                ORDER BY Total  DESC`;
            const students = yield database_1.default.query(query, [id]);
            res.json(students);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO student set ?', [req.body]);
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
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE student SET ? WHERE id = ?', [req.body, id]);
            res.json({ text: 'Student ' + id + ' was updated successfully' });
        });
    }
}
exports.studentController = new StudentController();
