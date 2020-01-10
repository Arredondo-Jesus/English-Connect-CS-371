import mysql from 'promise-mysql';
import Keys2 from './Keys2';

const pool = mysql.createPool(Keys2.database);

pool.getConnection()
    .then(connection => {
        pool.releaseConnection(connection);
        console.log('DB 2 is connected');
    });

    export default pool;