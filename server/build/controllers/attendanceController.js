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
exports.attendanceController = void 0;
const database_1 = __importDefault(require("../database"));
class AttendanceController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const attendance = yield database_1.default.query("SELECT * FROM attendance WHERE status = 'active'");
            res.json(attendance);
        });
    }
    getAttendanceByGroup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { date } = req.params;
            const attendance = yield database_1.default.query(`SELECT a.attendance_value,
                                             s.id AS 'student_id',
                                             a.lesson,
                                             a.date,
                                             s.name,
                                             s.last_name,
                                             a.id
                                             FROM attendance a
                                             JOIN student s ON a.student_id = s.id
                                             WHERE a.date = ?
                                             AND s.course_id = ?
                                             AND a.status = 'active'`, [date, id]);
            res.json(attendance);
        });
    }
    getGroup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const attendance = yield database_1.default.query(`SELECT s.id,
                                            s.name,
                                            s.last_name,
                                            s.status
                                            FROM student s
                                            WHERE s.status = 'active'
                                            AND course_id = ?`, [id]);
            res.json(attendance);
        });
    }
    listByDate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const query = `SELECT 
                            a.date, 
                            COUNT(a.student_id) AS 'Total',
                            COUNT(CASE WHEN a.attendance_value = 1 THEN 1 END) AS 'Yes',
                            c.id,
                            c.name,
                            c.level,
                            a.lesson,
                            a.id
                        FROM attendance a
                        JOIN student s ON s.id = a.student_id
                        JOIN course c ON c.id = s.course_id
                        WHERE a.status = 'active'
                        AND c.id = ?
                        GROUP BY a.date`;
            const attendance = yield database_1.default.query(query, [id]);
            res.json(attendance);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const attendance = yield database_1.default.query('SELECT * FROM attendance WHERE id = ?', [id]);
            if (attendance.length > 0) {
                return res.json(attendance[0]);
            }
            res.status(404).json(res.json({ text: 'Record was not found' }));
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO attendance set ?', [req.body]);
            res.json({ message: 'Record saved' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE course SET status = ? WHERE id = ?', [req.body, id]);
            res.json({ text: 'Record ' + id + ' was deleted successfully' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE attendance SET ? WHERE id = ?', [req.body, id]);
            res.json('Record ' + id + ' was updated successfully');
        });
    }
}
exports.attendanceController = new AttendanceController();
