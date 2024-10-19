const Database = require('#database')
const Luxon = require('luxon')
const crypto = require('node:crypto')
const jwt = require('jsonwebtoken')

const encryptPassword = (plainPassword) => crypto
.pbkdf2Sync(plainPassword, process.env.SECRET_KEY, 10000, 64, "sha512")
.toString("base64");

const register = async (req, res) => {
    try {
        
        const {email, password, gender_id} = req.body

        if(!email || !password || !gender_id){
            throw('Para crear un registro son obligatorios tres campos: email, contraseña y genero.')
        }

        const [resultsEmailValidation] = await Database.query(
            'SELECT * FROM `users` WHERE email = ?', [email]
        );

        if(resultsEmailValidation.length){
            throw('Ya existe un usuario con el correo provisto.')
        }

        const encryptedPassword = encryptPassword(password)

        const [results] = await Database.query(
            'INSERT INTO `users` (email, password, gender_id) VALUES (?, ?, ?)', [email, encryptedPassword, gender_id]
          );
        
        return res.send({data: {email, id: results.insertId, gender_id}, error: null})
    } catch (err) {
        return res.status(400).send({data: null, error: 'Error al consultar la DB: ' + err});
    }
}

const login = async (req, res) => {
    try {
        
        const {email, password} = req.body

        if(!email || !password){
            throw('Para iniciar sesión son obligatorios dos campos: email y contraseña.')
        }

        const [results] = await Database.query(
            'SELECT * FROM `users` WHERE email = ?', [email]
        );

        if(!results.length){
            throw('No existe ningún usuario con el correo provisto.')
        }

        const encryptedPassword = encryptPassword(password)

        const user = results[0]

        if(encryptedPassword !== user.password){
            throw('La contraseña para el usuario provisto es incorrecta')
        }

        const token = jwt.sign({id: user.id, email: user.email, gender_id: user.gender_id}, process.env.SECRET_KEY, {
            expiresIn: "1h",
        });

        return res.send({data: {token}, error: null})
    } catch (err) {
        return res.status(400).send({data: null, error: 'Error al consultar la DB: ' + err});
    }
}

module.exports = {
    register, login
}