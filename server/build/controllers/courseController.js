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
exports.courseController = void 0;
const database_1 = __importDefault(require("../database"));
class CourseController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const courses = yield database_1.default.query(`SELECT c.id,
                                          SUM(IF(s.status = 'active',1,0)) AS 'count',
                                          c.name,
                                          c.level,
                                          c.time,
                                          c.day,
                                          c.year,
                                          c.building,
                                          c.status,
                                          i.id AS 'instructorId', 
                                          i.name AS 'instructorName',
                                          i.last_name,
                                          i.email AS 'instructorEmail'
                                        FROM course c
                                        JOIN instructor i ON i.id = c.instructor_id
                                        LEFT OUTER JOIN student s ON s.course_id = c.id
                                        WHERE c.status = 'active'
                                        GROUP BY c.id
                                        ORDER BY c.year DESC`);
            res.json(courses);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const course = yield database_1.default.query('SELECT * FROM course WHERE id = ?', [id]);
            if (course.length > 0) {
                return res.json(course[0]);
            }
            res.status(404).json(res.json({ text: 'Course was not found' }));
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO course set ?', [req.body]);
            res.json({ message: 'Course saved' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE course SET status = ? WHERE id = ?', [req.body.status, id]);
            res.json({ text: 'Course ' + id + ' was deleted successfully' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE course SET ? WHERE id = ?', [req.body, id]);
            res.json({ text: 'Course ' + id + ' was updated successfully' });
        });
    }
}
exports.courseController = new CourseController();
