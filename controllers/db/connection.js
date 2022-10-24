const mariadb =  requiere ("mariadb")

const config ={
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_NAME,
    database: process.env.DB_PORT,
   connectionlimit: process.env.DB_CONN_LIMIT 
}