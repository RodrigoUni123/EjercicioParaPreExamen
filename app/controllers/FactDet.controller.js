const db = require('../config/db.config.js');
const FactDetalle = db.FactDetalle;

exports.create = (req, res) => {
    let factDetalle = {};

    try {
        //Building FactDetalle object from uploading requests body
        factDetalle.Cantidad = req.body.Cantidad;

        // save to MySQL database
        FactDetalle.create(factDetalle).then(result => {
            // send uploading message to client    
            res.status(200).json({
                message: "Detalle de factura creado exitosamente con id = " + result.id_Linea,
                factDetalle: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear el detalle de la factura",
            error: error.message
        });
    }
}

exports.getFactDetalleById = (req, res) => {
    // find all FactDet information from
    let factDetalleId = req.params.id;
    FactDetalle.findByPk(factDetalleId)
        .then(factDetalle => {
                res.status(200).json({
                    message: "Detalle de factura obtenido exitosamente con id = " + factDetalleId,
                    factDetalle: factDetalle
                });
        })
        .catch(error => {
            // log on console
            console.log(error);

            res.status(500).json({
                message: "Error al obtener el detalle de factura",
                error: error
            });
        });
}

exports.updateById = async (req, res) => {
    try {
        let factDetalleId = req.params.id;
        let factDetalle = await FactDetalle.findByPk(factDetalleId);

        if (!factDetalle) {
            // return a response to client
            res.status(404).json({
                message: "No se encontró el detalle de factura con id = " + factDetalleId,
                factDetalle: "",
                error: "404"
            });
        } else {    
            // update new change to database
            let updatedObject = {
                Cantidad: req.body.Cantidad,
            }
            let result = await FactDetalle.update(updatedObject, { returning: true, where: { id_Linea: factDetalleId } });

            // return the response to client
            if (!result) {
                res.status(500).json({
                    message: "Error no se pudo actualizar el detalle de factura con id = " + req.params.id,
                    error: "No se pudo actualizar",
                });
            }

            res.status(200).json({
                message: "Detalle de factura actualizado exitosamente con id = " + factDetalleId,
                factDetalle: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error no se puede actualizar el detalle de factura con id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try {
        let factDetalleId = req.params.id;
        let factDetalle = await FactDetalle.findByPk(factDetalleId);

        if (!factDetalle) {
            res.status(404).json({
                message: "No existe un detalle de factura con id = " + factDetalleId,
                error: "404",
            });
        } else {
            await factDetalle.destroy();
            res.status(200).json({
                message: "Detalle de factura eliminado con id = " + factDetalleId,
                factDetalle: factDetalle,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error no se puede eliminar el detalle de factura con id = " + req.params.id,
            error: error.message,
        });
    }
}
