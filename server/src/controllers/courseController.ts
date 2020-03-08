import {Request , Response} from 'express';
import pool from '../database';

class CourseController {

    public async list (req: Request, res: Response){
        const courses = await pool.query(`SELECT c.id,
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
    }

    public async getOne (req: Request, res: Response): Promise<any>{
        const { id } = req.params;
        const course = await pool.query('SELECT * FROM course WHERE id = ?', [id]);

        if (course.length > 0){
            return res.json(course[0]);
        }

        res.status(404).json(res.json({text: 'Course was not found'}));
    }

    public async create (req: Request, res: Response): Promise <void>{
        await pool.query('INSERT INTO course set ?', [req.body]);
        res.json({message: 'Course saved'});
    }

    public async delete (req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        await pool.query('UPDATE course SET status = ? WHERE id = ?', [req.body.status, id]);
        res.json({text: 'Course ' + id + ' was deleted successfully'});
    }

    public async update (req: Request, res: Response){
        const { id } = req.params;
        await pool.query('UPDATE course SET ? WHERE id = ?', [req.body, id]);
        res.json({text: 'Course ' + id + ' was updated successfully'});
    }
}

export const courseController = new CourseController();
