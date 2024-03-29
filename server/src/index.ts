import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import dotenv from 'dotenv';
dotenv.config();

import indexRoutes from './routes/indexRoutes';
import courseRoutes from './routes/courseRoutes';
import instructorRoutes from './routes/instructorRoutes';
import studentRoutes from './routes/studentRoutes';
import attendanceRoutes from './routes/attendanceRoutes';
import  userRoutes from './routes/userRoutes';
import loginRoutes from './routes/loginRoutes';
class Server {
    
    public app: Application;
    
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

   

    config(): void {
        // configure server
        this.app.set('port', process.env.PORT || 3000 );
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.static('./public'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
        
        // configure cors
        this.app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "http://localhost:4200");
            res.header(
              "Access-Control-Allow-Headers",
              "Origin, X-Requested-With, Content-Type, Accept"
            );
            next();
          });
    }
        
    routes(): void {
        this.app.use('/', indexRoutes);
        this.app.use('/api/courses', courseRoutes);
        this.app.use('/api/students', studentRoutes);
        this.app.use('/api/instructors', instructorRoutes);
        this.app.use('/api/attendance', attendanceRoutes);
        this.app.use('/api/users', userRoutes);
        this.app.use('/api/login', loginRoutes);
    }

    start(): void {
        this.app.listen(this.app.get('port'), () =>{
            console.log('Server on port ', this.app.get('port'));
        });
    }
}

const server = new Server();
server.start();