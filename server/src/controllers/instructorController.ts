import {Request , Response} from 'express';
import pool from '../database';

import path from 'path';
import fs from 'fs-extra';
import * as csv from 'fast-csv';
import fst from 'fs';
import * as encryptService from '../libs/encrypt';
class InstructorController {

    public async list (req: Request, res: Response){
        const instructors = await pool.query(`SELECT * FROM instructor`);
        res.json(instructors)
    }

    public async getOne (req: Request, res: Response): Promise<any>{
        const { id } = req.params;
        const instructor = await pool.query(`SELECT * FROM instructor 
                                            WHERE id = ?`, [id]);

        if (instructor.length > 0){
            return res.json(instructor[0]);
        }

        res.status(404).json(res.json({text: 'Instructor was not found'}));
    }

    public async create (req: Request, res: Response): Promise <void>{
        await pool.query(`INSERT INTO instructor set ?`, [req.body]);
        res.json({message: 'Instructor saved'});
    }

    public async delete (req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        await pool.query('UPDATE instructor SET status = ? WHERE id = ?', [req.body, id]);
        res.json({text: 'Instructor ' + id + ' was deleted successfully'});
    }

    public async update (req: Request, res: Response){
        const { id } = req.params;
        await pool.query(`UPDATE instructor set ?`, [req.body]);
        res.json({text: 'Instructor ' + id + ' was updated successfully'});
    }

    public async uploadCsv(req: Request, res: Response) {
        //Print result from file upload to console
        console.log('Saving file');
        console.log(req.file);
        const encrypt = new encryptService.EncryptService();

        //Read Uploaded File
        await fst.createReadStream(path.resolve(req.file.path))
            .pipe(csv.parse({ headers: [
                            'id',
                            'name',
                            'last_name',
                            'phone',
                            'email',
                            'stake'], ignoreEmpty: true, skipRows: 1}))
            .on('error', error => console.error(error))
            .on('data', row => {

                row.name = row.name.trim();
                row.last_name = row.last_name.trim();
                row.id = row.name.substring(0,2) + row.last_name.substring(0,3);
                row.id = row.id.toUpperCase();
                row.name = encrypt.encryptData(row.name);
                row.last_name = encrypt.encryptData(row.last_name);
                row.phone = encrypt.encryptData(row.phone);
                row.email = encrypt.encryptData(row.email);

                // Insert record in database
                pool.query(`INSERT INTO instructor 
                            set id = ?,
                            name = ?,
                            last_name = ?,
                            phone = ?,
                            email = ?,
                            stake = ?`,
                            [row.id,
                            row.name,
                            row.last_name,
                            row.phone,
                            row.email,
                            row.stake]);
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
        await pool.query('DELETE FROM instructor');
        return res.json({text: 'The database was deleted successfully '});
    }
}

export const instructorController = new InstructorController();
