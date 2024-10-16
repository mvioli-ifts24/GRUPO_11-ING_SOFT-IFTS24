const Database = require('#database')
const Luxon = require('luxon')

const index = async (req, res) => {
    try {
    const [results] = await Database.query(
      'SELECT * FROM `games_news`'
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
          'SELECT * FROM `games_news` WHERE id = ?', [id]
        );
      
        return res.send({data: results.length ? results[0] : null, error: null})
      } catch (err) {
        return res.status(400).send({data: null, error: 'Error al consultar la DB: ' + err});
    }
}

const store = async (req, res) => {
    try {

        const {title, description, published_at} = req.body

        if(!title || !description || !published_at){
            throw('Para crear un registro son obligatorios tres campos: titulo, descripción y fecha de publicación.')
        }

        const [results] = await Database.query(
          'INSERT INTO `games_news` (title, description, published_at) VALUES (?,?,?)', [title, description, published_at]
        );
      
        return res.send({data: {title, description, published_at, id: results.insertId}, error: null})
      } catch (err) {
        return res.status(400).send({data: null, error: 'Error al consultar la DB: ' + err});
    }
}

const update = async (req, res) => {
    try {

        const {id} = req.params

        const {title, description, published_at} = req.body

        if(!title || !description || !published_at){
          throw('Para actualizar un registro son obligatorios tres campos: titulo, descripción y fecha de publicación.')
      }

        await Database.query(
          `UPDATE games_news SET title = ?, description = ?, published_at = ? WHERE id = ?`, [title, description, published_at, id]
        );

        const [results] = await Database.query(
            'SELECT * FROM `games_news` WHERE id = ?', [id]
          );
      
        return res.send({data: results.length ? results[0] : null, error: null})
      } catch (err) {
        return res.status(400).send({data: null, error: 'Error al consultar la DB: ' + err});
    }
}

const disable = async (req, res) => {
  try {
    
    const {id} = req.params

    const {disable} = req.body

    if(disable !== 0 && disable !== 1){
      throw('Para deshabilitar un registro es obligatorio el campo disable con un valor de 0 o 1.')
    }
    
    await Database.query(
      `UPDATE games_news SET deleted_at = ? WHERE id = ?`, [Luxon.DateTime.now().toSQL({includeOffset: false}), id]
    )

    const [results] = await Database.query(
      'SELECT * FROM `games_news` WHERE id = ?', [id]
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
          'DELETE FROM `games_news` WHERE id = ?', [id]
        );
      
        return res.send({data: null, error: null})
      } catch (err) {
        return res.status(400).send({data: null, error: 'Error al consultar la DB: ' + err});
    }
}

module.exports = {
    index,show,store,update,disable,destroy
}