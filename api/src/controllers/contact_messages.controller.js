const Database = require('#database')

const index = async (req, res) => {
    try {

    const [results] = await Database.query(
      'SELECT * FROM `contact_messages`'
    );
  
    return res.send({data: results, error: null})
  } catch (err) {
    return res.status(400).send({data: null, error: 'Error al consultar la DB: ' + err});
  }
}

const store = async (req, res) => {
    try {

        const {message} = req.body

        if(!message){
            throw('Para crear un registro es obligatorio el campo message.')
        }

        const [results] = await Database.query(
          'INSERT INTO `contact_messages` (message) VALUES (?)', [message]
        );
      
        return res.send({data: {message, id: results.insertId}, error: null})
      } catch (err) {
        return res.status(400).send({data: null, error: 'Error al consultar la DB: ' + err});
    }
}

const patchResponse = async (req, res) => {
    try {

        const {id} = req.params

        const {response} = req.body

        if(!response){
          throw('Para contestar un mensaje es necesario el campo de response.')
      }

        await Database.query(
          `UPDATE contact_messages SET response = ? WHERE id = ?`, [response, id]
        );

        const [results] = await Database.query(
            'SELECT * FROM `contact_messages` WHERE id = ?', [id]
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
          'DELETE FROM `contact_messages` WHERE id = ?', [id]
        );
      
        return res.send({data: null, error: null})
      } catch (err) {
        return res.status(400).send({data: null, error: 'Error al consultar la DB: ' + err});
    }
}

module.exports = {
    index,store,patchResponse,destroy
}