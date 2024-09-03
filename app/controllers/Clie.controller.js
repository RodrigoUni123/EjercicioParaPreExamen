const db = require('../config/db.config.js');
const Cliente = db.Cliente;

exports.create = (req, res) => {
    let cliente = {};

    try {
        // Building Cliente object from upoading requests body
        cliente.Nombre = req.body.Nombre;
        cliente.Apellido = req.body.Apellido;
        cliente.Razon_Social = req.body.Razon_Social;
        cliente.Nit = req.body.Nit;
        cliente.Direccion = req.body.Direccion;
        cliente.Telefono = req.body.Telefono;
        cliente.Email = req.body.Email;
        cliente.Fecha_Ingreso = req.body.Fecha_Ingreso;
        cliente.Estatus = req.body.Estatus;

        // Save to MySQL database
        Cliente.create(cliente).then(result => {
            // send uploading message to client    
            res.status(200).json({
                message: "Upload Successfully a Cliente with id = " + result.id_cliente,
                cliente: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
}

exports.getClienteById = (req, res) => {
    // find all Cliente information from
    let clienteId = req.params.id_cliente;
    Cliente.findByPk(clienteId)
        .then(cliente => {
            res.status(200).json({
                    message: " Successfully Get a Cliente with id = " + clienteId,
                    cliente: cliente
                });
            }) 
            .catch(error => {
                // log on console
            console.log(error);

            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}

exports.updateById = async (req, res) => {
    try {
        let clienteId = req.params.id_cliente;
        let cliente = await Cliente.findByPk(clienteId);

        if (!cliente) {
            res.status(404).json({
                message: "No se encontró el Cliente con id = " + clienteId,
                cliente: "",
                error: "404"
            });
        } else {
            // update new change to database
            let updatedObject = {
                Nombre: req.body.Nombre,
                Apellido: req.body.Apellido,
                Razon_Social: req.body.Razon_Social,
                Nit: req.body.Nit,
                Direccion: req.body.Direccion,
                Telefono: req.body.Telefono,
                Email: req.body.Email,
                Fecha_Ingreso: req.body.Fecha_Ingreso,
                Estatus: req.body.Estatus,
            }
            let result = await Cliente.update(updatedObject, { returning: true, where: { id_cliente: clienteId } });

            // return the response to client
            if (!result) {
                res.status(500).json({
                    message: "Error -> Can NOT update with id = " + req.params.id_cliente,
                    error: "Can NOT Updated",
                });
            } 

            res.status(200).json({
                    message: "Update successfully a Cliente with id = " + clienteId,
                    cliente: updatedObject,
                });
            }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can not update a Cliente with id = " + req.params.id_cliente,
            error: error.message
        });
    }
}

// Eliminar Cliente por ID
exports.deleteById = async (req, res) => {
    try {
        let clienteId = req.params.id_cliente;
        let cliente = await Cliente.findByPk(clienteId);

        if (!cliente) {
            res.status(404).json({
                message: "Does Not exist a Cliente with id = " + clienteId,
                error: "404",
            });
        } else {
            await cliente.destroy();
            res.status(200).json({
                message: "Delete Successfully a Cliente with id = " + clienteId,
                cliente: cliente,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a Cliente with id = " + req.params.id_cliente,
            error: error.message,
        });
    }
}