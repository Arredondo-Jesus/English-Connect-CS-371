import {Request , Response} from 'express';
import pool from '../database';

class StudentController {

    public async list (req: Request, res: Response){
        const students = await pool.query(`SELECT 	s.name,
                                            s.last_name,
                                            s.age,
                                            s.email,
                                            s.phone,
                                            s.member,
                                            s.ward,
                                            s.status,
                                            SUM(a.attendance_value) AS 'yes',
                                            COUNT(s.id) AS 'total'
                                            FROM student s
                                            LEFT JOIN attendance a ON a.student_id = s.id
                                            JOIN course c ON c.id = s.course_id
                                            WHERE s.status = 'active'
                                            GROUP BY s.id`);
        res.json(students);
    }

    public async getOne (req: Request, res: Response): Promise<any>{
        const { id } = req.params;
        const course = await pool.query(`SELECT * FROM student WHERE status = 'active' AND id = ?`, [id]);

        if (course.length > 0){
            return res.json(course[0]);
        }

        res.status(404).json(res.json({text: 'Student was not found'}));
    }

    public async getByCourse (req: Request, res: Response): Promise <void>{
        const { id } = req.params;
        const { date } = req.params;

        const query = `SELECT a.date,
                s.name, 
                s.last_name, 
                a.attendance_value,
                a.date,
                a.lesson
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

        const query = `SELECT 	s.name,
                        s.last_name,
                        s.age,
                        s.email,
                        s.phone,
                        s.member,
                        s.ward,
                        s.status,
                        SUM(a.attendance_value) AS 'yes',
                        COUNT(s.id) AS 'total'
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
                                                  s.ward
                                            FROM student s
                                            GROUP BY s.ward  
                                            ORDER BY Total  DESC`);
        res.json(students);
    }

    public async create (req: Request, res: Response): Promise <void>{
        await pool.query('INSERT INTO student set ?', [req.body]);
        res.json({message: 'Student saved'});
    }

    public async delete (req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        await pool.query('UPDATE student SET status = ? WHERE id = ?', [req.body, id]);
        res.json({text: 'Student ' + id + ' was deleted successfully'});
    }

    public async update (req: Request, res: Response){
        const { id } = req.params;
        await pool.query('UPDATE student SET ? WHERE id = ?', [req.body, id]);
        res.json({text: 'Student ' + id + ' was updated successfully'});
    }
}

export const studentController = new StudentController();
