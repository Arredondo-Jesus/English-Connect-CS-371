import {Request , Response} from 'express';
import pool from '../database';

import path from 'path';
import fs from 'fs-extra';
import * as csv from 'fast-csv';
import fst from 'fs';
import * as encryptService from '../libs/encrypt';
import * as decryptService from '../libs/decrypt';
class CourseController {
    
    public async list (req: Request, res: Response){
        const courses = await pool.query(`SELECT c.id,
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
    }

    public async getOne (req: Request, res: Response): Promise<any>{
        const { id } = req.params;
        const course = await pool.query(`SELECT * FROM course WHERE id=?`, [id]);

        if (course.length > 0){
            return res.json(course[0]);
        }

        res.status(404).json(res.json({text: 'Course was not found'}));
    }

    public async create (req: Request, res: Response): Promise <void>{
        await pool.query(`INSERT INTO course
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
                          WHERE i.id = ?`
                        , [ req.body.id, 
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
        res.json({message: 'Course saved'});
    }

    public async delete (req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        await pool.query(`UPDATE course SET status = ? WHERE id = ?`, [req.body.status, id]);
        res.json({text: 'Course ' + id + ' was deleted successfully'});
    }

    public async update (req: Request, res: Response){
        const { id } = req.params;
        await pool.query(`UPDATE course 
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
                          WHERE id = ?`, 
                          [ req.body.id, 
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
        res.json({text: 'Course ' + id + ' was updated successfully'});
    }




    public async uploadCsv(req: Request, res: Response) {
        //Print result from file upload to console
        console.log('Saving file');
        console.log(req.file);

        const encrypt = new encryptService.EncryptService();
        const decrypt = new decryptService.DecryptService();
        
        //Read Uploaded File
        await fst.createReadStream(path.resolve(req.file.path))
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
                            'instructor_id'], ignoreEmpty: true, skipRows: 1}))
            .on('error', error => console.error(error))
            .on('data', row => {

                row.instructor_name = row.instructor_name.trim();
                row.instructor_last_name = row.instructor_last_name.trim();
                row.instructor_id = row.instructor_name.substring(0,2) + row.instructor_last_name.substring(0,3);
                row.instructor_id = row.instructor_id.toUpperCase();

                let name = encrypt.encryptData(row.instructor_name);
                let last_name = encrypt.encryptData(row.instructor_last_name);

                pool.query(`INSERT INTO course
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
                            instructor_id = ?`, 
                                                [row.id, 
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
        await pool.query('DELETE FROM course');
        return res.json({text: 'The database was deleted successfully '});
    }
}

export const courseController = new CourseController();
