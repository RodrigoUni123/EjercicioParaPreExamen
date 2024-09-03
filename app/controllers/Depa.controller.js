const db = require('../config/db.config.js');
const Departamento = db.Departamento;

exports.create = (req, res) => {
    let departamento = {};

    try {
        // Building Customer object from upoading requests body
        departamento.Descripcion = req.body.Descripcion;

        // save to MySQL database
        Departamento.create(departamento).then(result => {
          // send uploading message to client
            res.status(200).json({
                message: "Departamento creado exitosamente con id = " + result.id_departamento,
                departamento: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "¡Fail!",
            error: error.message
        });
    }
}


exports.getDepartamentoById = (req, res) => {
    // find all Customer information from
    let departamentoId = req.params.id_departamento;
    Departamento.findByPk(departamentoId)
        .then(departamento => {
                res.status(200).json({
                    message: " Successfully Get a Customer with id = " + departamentoId,
                    departamento: departamento
                });
        })
        .catch(error => {
          // log on console
            console.log(error);

            res.status(500).json({
                message: "¡Error!",
                error: error
            });
        });
}

exports.updateById = async (req, res) => {
    try {
        let departamentoId = req.params.id_departamento;
        let departamento = await Departamento.findByPk(departamentoId);

        if (!departamento) {
          //return a response to client
            res.status(404).json({
                message: "Not found for updating a Departamento with id = " + departamentoId,
                departamento: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                Descripcion: req.body.Descripcion,
            }
            let result = await Departamento.update(updatedObject, {returning: true, where: {id_departamento: departamentoId}});

            // return the response to client
            if (!result) {
                res.status(500).json({
                    message: "Error -> No se pudo actualizar el Departamento con id = " + req.params.id_departamento,
                    error: "Can NOT Update",
                });
            } 

            res.status(200).json({
                    message: "Update successfully a Departamento with id = " + departamentoId,
                    departamento: updatedObject,
                });
            }
        
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can not update a Departamento with id = " + req.params.id_departamento,
            error: error.message
        });
    }
}

// Eliminar Departamento por ID
exports.deleteById = async (req, res) => {
    try {
        let departamentoId = req.params.id_departamento;
        let departamento = await Departamento.findByPk(departamentoId);

        if (!departamento) {
            res.status(404).json({
                message: "Does Not exist a Departamento with id = " + departamentoId,
                error: "404",
            });
        } else {
            await departamento.destroy();
            res.status(200).json({
                message: "Delete successfully a Departamento with id = " + departamentoId,
                departamento: departamento,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can Not delete a customer with id = " + req.params.id_departamento,
            error: error.message,
        });
    }
}