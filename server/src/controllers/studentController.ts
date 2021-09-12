import {Request , Response} from 'express';
import pool from '../database';

import path from 'path';
import fs from 'fs-extra';
import * as csv from 'fast-csv';
import fst from 'fs';
import * as encryptService from '../libs/encrypt';
class StudentController {


    public async list (req: Request, res: Response){
        const students = await pool.query(`SELECT s.id,	
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
    }

    public async getInactiveStudents (req: Request, res: Response){
        const students = await pool.query(`SELECT s.id,	
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
    }

    public async getOne (req: Request, res: Response): Promise<any>{
        
        const { id } = req.params;
        const course = await pool.query(`SELECT s.id,	
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

        if (course.length > 0){
            return res.json(course[0]);
        }

        res.status(404).json(res.json({text: 'Student was not found'}));
    }

    public async getByCourse (req: Request, res: Response): Promise <void>{
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
        const students = await pool.query(query, [id, date]);
        res.json(students);
    }

    public async getByCourseDetails (req: Request, res: Response): Promise <void>{
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
        const students = await pool.query(query, [id]);
        res.json(students);
    }


    public async countPerWard (req: Request, res: Response){
        const students = await pool.query(`SELECT count(s.id) AS 'Total',
                                                  s.stake,
                                                  s.status
                                            FROM student s
                                            WHERE s.status = 'active'
                                            GROUP BY s.stake  
                                            ORDER BY s.stake`);
        res.json(students);
    }

    public async attendancePerWard (req: Request, res: Response){

        const students = await pool.query(`SELECT s.course_id,
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
    }

    public async attendancePerStudent (req: Request, res: Response){
        //TODO      
        const students = await pool.query(`SELECT c.id AS 'class_id',
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
    }

    public async create (req: Request, res: Response): Promise <void>{
        
        req.body.name = req.body.name.trim();
        req.body.last_name = req.body.last_name.trim();
        req.body.id = req.body.name.substring(0,1) + req.body.last_name.substring(0,1) + req.body.email.substring(0,2) + req.body.stake.replace(/\s+/g, '');
        req.body.id = req.body.id.toUpperCase();

        await pool.query(`INSERT INTO student 
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
        res.json({message: 'Student saved'});
    }

    public async delete (req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        await pool.query('UPDATE student SET status = ? WHERE id = ?', [req.body, id]);
        res.json({text: 'Student ' + id + ' was deleted successfully'});
    }

    public async activate (req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        await pool.query('UPDATE student SET status = ? WHERE id = ?', [req.body.status, id]);
        res.json({text: 'Student ' + id + ' was activated successfully'});
    }

    public async update (req: Request, res: Response){
        const { id } = req.params;
        await pool.query(`UPDATE student set 
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
        res.json({text: 'Student ' + id + ' was updated successfully'});
    }


    public async uploadCsv(req: Request, res: Response) {
        //Print result from file upload to console

        const encrypt = new encryptService.EncryptService();

        //Read Uploaded File
        await fst.createReadStream(path.resolve(req.file.path))
            .pipe(csv.parse({ headers: [
                            'id',
                            'name',
                            'last_name',
                            'email',
                            'phone',
                            'stake',
                            'course_id'], ignoreEmpty: true, skipRows: 1}))
            .on('error', error => console.error(error))
            .on('data', row => {

                row.name = row.name.trim();
                row.last_name = row.last_name.trim();
                row.id = row.name.substring(0,1) + row.last_name.substring(0,1) + row.email.substring(0,2) + row.stake.replace(/\s+/g, '');
                row.id = row.id.toUpperCase();

                row.name = encrypt.encryptData(row.name);
                row.last_name = encrypt.encryptData(row.last_name);
                row.phone = encrypt.encryptData(row.phone);
                row.email = encrypt.encryptData(row.email);

                // Insert record in database
                pool.query(`INSERT INTO student 
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
            .on('end', (rowCount: number) => console.log(`Parsed ${rowCount} rows`));
        

        //Delete Physical File
        if (req.file.path) {
            await fs.unlinkSync(path.resolve(req.file.path));
         }
         
        //Return Response of processing file
        return res.json({
            message: 'File Successfully Saved',
            file: req.file
        })
    }

    //Delete Database
    public async deleteTable(req: Request, res: Response) {
        await pool.query('DELETE FROM student');
        return res.json({text: 'The database was deleted successfully '});
    }
}

export const studentController = new StudentController();
