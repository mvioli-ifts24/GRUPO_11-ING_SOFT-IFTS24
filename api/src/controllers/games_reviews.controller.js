const Database = require('#database')
const Luxon = require('luxon')

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

        const {title, description, rating_id, image_url} = req.body

        if(!title || !description || !rating_id || !image_url){
            throw('Para crear un registro son obligatorios tres campos: titulo, reseña, url de portada y puntuación.')
        }

        const [results] = await Database.query(
          'INSERT INTO `games_reviews` (title, description, image_url, rating_id) VALUES (?,?,?,?)', [title, description, image_url, rating_id]
        );
      
        return res.send({data: {title, description, rating_id, id: results.insertId}, error: null})
      } catch (err) {
        return res.status(400).send({data: null, error: 'Error al consultar la DB: ' + err});
    }
}

const update = async (req, res) => {
    try {

        const {id} = req.params

        const {title, description, rating_id, image_url} = req.body

        if(!title || !description || !rating_id || !image_url){
          throw('Para actualizar un registro son obligatorios tres campos: titulo, reseña, y puntuación.')
      }

        await Database.query(
          `UPDATE games_reviews SET title = ?, description = ?, image_url = ?, rating_id = ? WHERE id = ?`, [title, description, image_url, rating_id, id]
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