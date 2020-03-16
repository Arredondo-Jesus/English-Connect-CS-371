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
class InstructorController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const instructors = yield database_1.default.query("SELECT *   FROM instructor i WHERE i.status = 'active' ORDER BY i.name");
            res.json(instructors);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const instructor = yield database_1.default.query('SELECT * FROM instructor WHERE id = ?', [id]);
            if (instructor.length > 0) {
                return res.json(instructor[0]);
            }
            res.status(404).json(res.json({ text: 'Instructor was not found' }));
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO instructor set ?', [req.body]);
            res.json({ message: 'Instructor saved' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE instructor SET status = ? WHERE id = ?', [req.body, id]);
            res.json({ text: 'Instructor ' + id + ' was deleted successfully' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE instructor SET ? WHERE id = ?', [req.body, id]);
            res.json({ text: 'Instructor ' + id + ' was updated successfully' });
        });
    }
}
exports.instructorController = new InstructorController();
