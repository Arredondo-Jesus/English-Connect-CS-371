import {Request , Response} from 'express';
import pool from '../database';

class InstructorController {

    public async list (req: Request, res: Response){
        const instructors = await pool.query("SELECT * FROM instructor i WHERE i.status = 'active' ORDER BY i.name");
        res.json(instructors);
    }

    public async getOne (req: Request, res: Response): Promise<any>{
        const { id } = req.params;
        const instructor = await pool.query('SELECT * FROM instructor WHERE id = ?', [id]);

        if (instructor.length > 0){
            return res.json(instructor[0]);
        }

        res.status(404).json(res.json({text: 'Instructor was not found'}));
    }

    public async create (req: Request, res: Response): Promise <void>{
        await pool.query('INSERT INTO instructor set ?', [req.body]);
        res.json({message: 'Instructor saved'});
    }

    public async delete (req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        await pool.query('UPDATE instructor SET status = ? WHERE id = ?', [req.body, id]);
        res.json({text: 'Instructor ' + id + ' was deleted successfully'});
    }

    public async update (req: Request, res: Response){
        const { id } = req.params;
        await pool.query('UPDATE instructor SET ? WHERE id = ?', [req.body, id]);
        res.json({text: 'Instructor ' + id + ' was updated successfully'});
    }
}

export const instructorController = new InstructorController();
