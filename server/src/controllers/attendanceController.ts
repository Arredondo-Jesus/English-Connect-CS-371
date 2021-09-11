import {Request , Response} from 'express';
import pool from '../database';

class AttendanceController {

    public async list (req: Request, res: Response){
        const attendance = await pool.query("SELECT * FROM attendance WHERE status = 'active'");
        res.json(attendance);
    }

    public async getAttendanceByGroup (req: Request, res: Response){
        const { id } = req.params;
        const { date } = req.params;
        const attendance = await pool.query(`SELECT a.attendance_value,
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
    }

    public async getGroup (req: Request, res: Response): Promise<any>{
        const { id } = req.params;
        const attendance = await pool.query(`SELECT s.id,
                                            s.name,
                                            s.last_name,
                                            s.status
                                            FROM student s
                                            WHERE s.status = 'active'
                                            AND course_id = ?`, [id]);
        res.json(attendance)
    }

    public async listByDate (req: Request, res: Response){
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
        const attendance = await pool.query(query, [id]);
        res.json(attendance);
    }

    public async getOne (req: Request, res: Response): Promise<any>{
        const { id } = req.params;
        const attendance = await pool.query('SELECT * FROM attendance WHERE id = ?', [id]);

        if (attendance.length > 0){
            return res.json(attendance[0]);
        }

        res.status(404).json(res.json({text: 'Record was not found'}));
    }

    public async create (req: Request, res: Response): Promise <void>{
        await pool.query('INSERT INTO attendance set ?', [req.body]);
        res.json({message: 'Record saved'});
    }

    public async delete (req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        await pool.query('UPDATE course SET status = ? WHERE id = ?', [req.body, id]);
        res.json({text: 'Record ' + id + ' was deleted successfully'});
    }

    public async update (req: Request, res: Response){
        const { id } = req.params;
        await pool.query('UPDATE attendance SET ? WHERE id = ?', [req.body, id]);
        res.json('Record ' + id + ' was updated successfully');
    }
}

export const attendanceController = new AttendanceController();
