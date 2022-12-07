const modeloUsuarios = {
    queryGetUsers: "SELECT * FROM Usuarios",
    queryGetUsersById: `SELECT * FROM Usuarios WHERE ID = ?`,
    queryDeleteduser: `UPDATE usuarios SET Activo = 'N'WHERE ID ?`,
    queryuserexist: `SELECT Usuario FROM Usuario WHERE Usuario = '?'`,
    queryadduser: `INSERT INTO Usuario (
       Usuario,
       Nombre del piloto,
       victorias,
       Escuderia,
       podios,
       Activos
    ) VALUES (
       '?',
       '?',
       '?',
       ?,
       '?',
       '?',
       '?',
       '?'
      
    )`,
    querygetuserinfo: `SELECT usuario, Nombre, Apellidos, Edad, Genero, Fecha_nacimiento 
    FROM usuarios 
    WHERE usuarios = '?'`,

   queryupdatebyusuario:`UPDATE usuarios SET (
       Nombre,= '?',
       Apellidos,='?',
       Edad,=? ,
       Genero,='?',
       Fecha_nacimiento='?',
       WHERE Usuario = '?'`,

   querysignIn: `SELECT Usuario, Contrasena, Activo FROM Usuario WHERE Usuario = '?'`    

}

module.exports = {modeloUsuarios,updateusuario}

const updateusuario = (
    nombre,
    victorias,
    escuderia,
    genero,
    fecha_nacimiento,
    usuario

) => {
    return `
        UPDATE Usuarios SET
        nombre = '${nombre}',
    apellidos = '${apellidos}',
    edad = '{edad}',
    ${genero ? `genero = '${genero}',`:''}
    fecha_nacimiento = '${fecha_nacimiento}'
        WHERE usuario = '{USUARIO}'
        `
}

//mysqldum -u root -p prueba > prueba.sql




