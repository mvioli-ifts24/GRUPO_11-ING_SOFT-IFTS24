const Database = require('../../database/connection')

const index = async (req, res) => {
    try {
    const [results] = await Database.query(
      'SELECT * FROM `games_reviews`'
    );
  
    return res.send({data: results, error: null})
  } catch (err) {
    return res.status(400).send({data: null, error: 'Error al consultar la DB: ' + err});
  }
}

const show = async (req, res) => {
    try {
        const {id} = req.params
        const [results] = await Database.query(
          'SELECT * FROM `games_reviews` WHERE id = ?', [id]
        );
      
        return res.send({data: results.length ? results[0] : null, error: null})
      } catch (err) {
        return res.status(400).send({data: null, error: 'Error al consultar la DB: ' + err});
    }
}

const store = async (req, res) => {
    try {

        const {title, description, rating} = req.body

        if(!title || !description || !rating){
            throw('Para crear un registro son obligatorios tres campos: titulo, reseña, y puntuación.')
        }

        const [results] = await Database.query(
          'INSERT INTO `games_reviews` (title, description, rating) VALUES (?,?,?)', [title, description, rating]
        );
      
        return res.send({data: {title, description, rating, id: results.insertId}, error: null})
      } catch (err) {
        return res.status(400).send({data: null, error: 'Error al consultar la DB: ' + err});
    }
}

const update = async (req, res) => {
    try {

        const {id} = req.params

        const editingFields = []

        for(const key in req.body){
            editingFields.push(`${key} = '${req.body[key]}'`)
        }

        await Database.query(
          `UPDATE games_reviews SET ${editingFields.join(', ')} WHERE id = ?`, [id]
        );

        const [results] = await Database.query(
            'SELECT * FROM `games_reviews` WHERE id = ?', [id]
          );
      
        return res.send({data: results.length ? results[0] : null, error: null})
      } catch (err) {
        return res.status(400).send({data: null, error: 'Error al consultar la DB: ' + err});
    }
}

const destroy = async (req, res) => {
    try {

        const {id} = req.params

        const [results] = await Database.query(
          'DELETE FROM `games_reviews` WHERE id = ?', [id]
        );
      
        return res.send({data: null, error: null})
      } catch (err) {
        return res.status(400).send({data: null, error: 'Error al consultar la DB: ' + err});
    }
}

module.exports = {
    index,show,store,update,destroy
}