const {request, response } = require ("express")
const pool = require("../db/connection")

const getUsers = async(req = request, res = response) => {
    let conn;
    try {
        conn = await pool.getConnection() //realizamos la conexion

        //generamos la consulta

        const users = await conn.query("SELECT * FROM Usuarios", (error) => { if (error) throw error})
       if (users.length === 0) { //en caso de no haver consulta lo informamos
            res.status(404).json({msg: 'NO EXISTEN USUARIOS REGISTRADOS'})
            return
        }
        res.json({users}) //se manda la lista de usuarios

    } catch (error) {
        console.log(error)
        res.status(500).json({msg: error}) //informamos el error

    } finally {
        if (conn) conn.end() //termina la conexion

    }
 
}
const getUserByID = async(req = request, res = response) => {
    const {id}=req.params
    let conn;

    try {
        conn = await pool.getConnection() //realizamos la conexion

        //generamos la consulta

        const [user]= await conn.query(`SELECT * FROM Usuarios WHERE ID = ${id}`, (error) => { if (error) throw error})

        console.log(user)

        if (!user) { //en caso de no haver consulta lo informamos
            res.status(404).json({msg: `NO EXISTEN USUARIOS REGISTRADOS CON EL ID ${id}`})
            return
        }
        res.json({user}) //se manda la lista de usuarios

    } catch (error) {
        console.log(error)
        res.status(500).json({msg: error}) 

    } finally {
        if (conn) conn.end() 

    }
}

const deleteUserByID = async(req = request, res = response) => {
    const {id}=req.query 
    let conn;
    
    try {
        conn = await pool.getConnection() //realizamos la conexion
        //generamos la consulta
         const {affectedRows}= await conn.query(`UPDATE Usuarios SET Activo = 'N' WHERE ID = ${id}`, (error) => { if (error) throw error})
      
        if (affectedRows === 0) { //en caso de no haver consulta lo informamos
            res.status(404).json({msg: `NO EXISTEN USUARIOS REGISTRADOS CON EL ID ${id}`})
            return
        }
        res.json({ msg:`El usuario con ID${id} se elimino satisfactoriamente `}) //se manda la lista de usuarios

    } catch (error) {
        console.log(error)
        res.status(500).json({error}) //informamos el error

    } finally {
        if (conn) conn.end() //termina la conexion

    }
}

const addUser = async(req = request, res = response) => {
    const {id}=req.params
    const {
        nombre,
        apellidos,
        edad,
        genero,
        usuario,
        contraseña,
        fecha_Nacimiento,
        Activo
    }=req.body
    if(
        !nombre||
        !apellidos||
        !edad||
        !usuario||
        !contraseña||
        !Activo 
        ){
        
        res.status(400).json({msg:"Falta informacion del usuario"})}
    let conn;
    try {
        conn = await pool.getConnection()
        const [affectedRows]= await conn.query(`
        INSERT INTO USUARIOS _(
            nombre,
            apellidos,
            edad,
            genero,
            usuario
            contraseña,
            fecha_Nacimiento,
            Activo
        ) VALUES (
            '${nombre}',
            '${apellidos}',
             ${edad},
            '${genero}',
            '${usuario}',
            '${contraseña}',
            '${fecha_Nacimiento}',
            '${Activo}',
        )
        `, (error) => { throw new Error(error) })

    
        if (affectedRows===0) { 
            res.status(404).json({msg: `NO se pudo agregar ${usuario}`})
            return
        }
        res.json({msg: `El usuario ${usuario} se  agrego satisfactoriamente.`}) 
 } catch (error) {
        console.log(error)
        res.status(500).json({error}) 
    } finally {
        if (conn) 
        conn.end() 
    }
}
module.exports = {getUsers, getUserByID, deleteUserByID, addUser}
