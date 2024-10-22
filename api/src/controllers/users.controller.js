const Database = require('#database')

const index = async (req, res) => {
    try {
    const [results] = await Database.query(
      'SELECT * FROM `users`'
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
          'SELECT * FROM `users` WHERE id = ?', [id]
        );
      
        return res.send({data: results.length ? results[0] : null, error: null})
      } catch (err) {
        return res.status(400).send({data: null, error: 'Error al consultar la DB: ' + err});
    }
}

const update = async (req, res) => {
    try {

        const {id} = req.params

        const {gender_id} = req.body

        if(!gender_id){
          throw('Para actualizar un registro es obligatorio el campo: genero.')
      }

        await Database.query(
          `UPDATE users SET gender_id = ? WHERE id = ?`, [gender_id, id]
        );

        const [results] = await Database.query(
            'SELECT * FROM `users` WHERE id = ?', [id]
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
          'DELETE FROM `users` WHERE id = ?', [id]
        );
      
        return res.send({data: null, error: null})
      } catch (err) {
        return res.status(400).send({data: null, error: 'Error al consultar la DB: ' + err});
    }
}

module.exports = {
    index,show,update,destroy
}