"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const storage = multer_1.default.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        cb(null, path_1.default.basename(file.originalname, path_1.default.extname(file.originalname)) +
            ' - ' +
            crypto_1.default.randomBytes(6).toString('hex') +
            path_1.default.extname(file.originalname));
    }
});
exports.default = (0, multer_1.default)({ storage });
