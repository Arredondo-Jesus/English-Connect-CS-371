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
exports.instructorController = void 0;
const database_1 = __importDefault(require("../database"));
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const csv = __importStar(require("fast-csv"));
const fs_1 = __importDefault(require("fs"));
const encryptService = __importStar(require("../libs/encrypt"));
class InstructorController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const instructors = yield database_1.default.query(`SELECT * FROM instructor`);
            res.json(instructors);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const instructor = yield database_1.default.query(`SELECT * FROM instructor 
                                            WHERE id = ?`, [id]);
            if (instructor.length > 0) {
                return res.json(instructor[0]);
            }
            res.status(404).json(res.json({ text: 'Instructor was not found' }));
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query(`INSERT INTO instructor set ?`, [req.body]);
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
            yield database_1.default.query(`UPDATE instructor set ?`, [req.body]);
            res.json({ text: 'Instructor ' + id + ' was updated successfully' });
        });
    }
    uploadCsv(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //Print result from file upload to console
            console.log('Saving file');
            console.log(req.file);
            const encrypt = new encryptService.EncryptService();
            //Read Uploaded File
            yield fs_1.default.createReadStream(path_1.default.resolve(req.file.path))
                .pipe(csv.parse({ headers: [
                    'id',
                    'name',
                    'last_name',
                    'phone',
                    'email',
                    'stake'
                ], ignoreEmpty: true, skipRows: 1 }))
                .on('error', error => console.error(error))
                .on('data', row => {
                row.name = row.name.trim();
                row.last_name = row.last_name.trim();
                row.id = row.name.substring(0, 2) + row.last_name.substring(0, 3);
                row.id = row.id.toUpperCase();
                row.name = encrypt.encryptData(row.name);
                row.last_name = encrypt.encryptData(row.last_name);
                row.phone = encrypt.encryptData(row.phone);
                row.email = encrypt.encryptData(row.email);
                // Insert record in database
                database_1.default.query(`INSERT INTO instructor 
                            set id = ?,
                            name = ?,
                            last_name = ?,
                            phone = ?,
                            email = ?,
                            stake = ?`, [row.id,
                    row.name,
                    row.last_name,
                    row.phone,
                    row.email,
                    row.stake]);
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
            yield database_1.default.query('DELETE FROM instructor');
            return res.json({ text: 'The database was deleted successfully ' });
        });
    }
}
exports.instructorController = new InstructorController();
