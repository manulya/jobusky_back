const Pool = require('pg').Pool
const pool=new Pool(

    {
        user: "postgres",
        password: '21022003',
        host:"localhost",
        port:5432,
        database: "jobushky"
    }
)

module.exports = pool