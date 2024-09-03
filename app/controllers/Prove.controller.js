const db = require('../config/db.config.js');
const Proveedor = db.Proveedor;

exports.create = (req, res) => {
    let proveedor = {};

    try {
        // Building Proveedor object from uploading request body
        proveedor.Empresa = req.body.Empresa;
        proveedor.Telefono = req.body.Telefono;
        proveedor.Nit = req.body.Nit;
        proveedor.Ciudad = req.body.Ciudad;
        proveedor.Pais = req.body.Pais;
        proveedor.Contacto = req.body.Contacto;
        proveedor.Email = req.body.Email;
        proveedor.Telefono_contacto = req.body.Telefono_contacto;
        proveedor.Estatus = req.body.Estatus;

        // save to MySQL database
        Proveedor.create(proveedor).then(result => {
            // send uploading message to client    
            res.status(200).json({
                message: "Upload Successfully with id = " + result.id_proveedor,
                proveedor: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
}

exports.getProveedorById = (req, res) => {
    //find all Proveedor information from
    let proveedorId = req.params.id;
    Proveedor.findByPk(proveedorId)
        .then(proveedor => {
            res.status(200).json({
                    message: "Susccessfully Get a Proveedor with id = " + proveedorId,
                    proveedor: proveedor
                });
        })
        .catch(error => {
            // log on console
            console.log(error);

            res.status(500).json({
                message: "Error al obtener el proveedor",
                error: error
            });
        });
}

exports.updateById = async (req, res) => {
    try {
        let proveedorId = req.params.id;
        let proveedor = await Proveedor.findByPk(proveedorId);

        if (!proveedor) {
            // return a response to client
            res.status(404).json({
                message: "Not found for updating a proveedor with id = " + proveedorId,
                proveedor: "",
                error: "404"
            });
        } else {
            // update new change to database    
            let updatedObject = {
                Empresa: req.body.Empresa,
                Telefono: req.body.Telefono,
                Nit: req.body.Nit,
                Ciudad: req.body.Ciudad,
                Pais: req.body.Pais,
                Contacto: req.body.Contacto,
                Email: req.body.Email,
                Telefono_contacto: req.body.Telefono_contacto,
                Estatus: req.body.Estatus,
            }
            let result = await Proveedor.update(updatedObject, { returning: true, where: { id_proveedor: proveedorId } });

            //return the desponse to client
            if (!result) {
                res.status(500).json({
                    message: "Error Can not update a Proveedor with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json({
                message: "Update Successfully a Proveedor with id = " + proveedorId,
                proveedor: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error Can not update a Proveedor with id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try {
        let proveedorId = req.params.id;
        let proveedor = await Proveedor.findByPk(proveedorId);

        if (!proveedor) {
            res.status(404).json({
                message: "Does NOT exist a Proveedor with id = " + proveedorId,
                error: "404",
            });
        } else {
            await proveedor.destroy();
            res.status(200).json({
                message: "Delete Successfully a Proveedor with id = " + proveedorId,
                proveedor: proveedor,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error Can NOT delete a Proveedor with id = " + req.params.id,
            error: error.message,
        });
    }
}

