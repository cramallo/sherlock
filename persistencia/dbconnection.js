//mysql connect
var mysql = require('mysql');
var pool  = mysql.createPool({
    connectionLimit : 100,
    host            : 'localhost',
    port            : '3306',
    user            : 'root',
    password        : '',
    database        : 'sherlock',
    checkExpirationInterval: 900000,// How frequently expired sessions will be cleared; milliseconds.
    expiration: 86400000,// The maximum age of a valid session; milliseconds.
    createDatabaseTable: true,// Whether or not to create the sessions database table, if one does not already exist.
    schema: {
        tableName: 'sessions',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    }
});

module.exports=pool;