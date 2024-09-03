const db = require('../config/db.config.js');
const Factura = db.Factura;

exports.create = (req, res) => {
    let factura = {};

    try {
        // Building Factura object from uploading request body
        factura.No_Factura = req.body.No_Factura;
        factura.Serie = req.body.Serie;
        factura.Fecha_Fac = req.body.Fecha_Fac;

        // Save to MySQL database
        Factura.create(factura).then(result => {   
            // send uploading message to client 
            res.status(200).json({
                message: "Factura creada exitosamente con id = " + result.id_factura,
                factura: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear la factura",
            error: error.message
        });
    }
}


exports.getFacturaById = (req, res) => {
    // find all Factura information from
    let facturaId = req.params.id;
    Factura.findByPk(facturaId)
        .then(factura => {
                res.status(200).json({
                    message: "Factura obtenida exitosamente con id = " + facturaId,
                    factura: factura
                });
        })
        .catch(error => {
            console.log(error);

            res.status(500).json({
                message: "Error al obtener la factura",
                error: error
            });
        });
}

exports.updateById = async (req, res) => {
    try {
        let facturaId = req.params.id;
        let factura = await Factura.findByPk(facturaId);

        if (!factura) {
            // return a response to client
            res.status(404).json({
                message: "No se encontró la factura con id = " + facturaId,
                factura: "",
                error: "404"
            });
        } else {  
            //update new change to database  
            let updatedObject = {
                No_Factura: req.body.No_Factura,
                Serie: req.body.Serie,
                Fecha_Fac: req.body.Fecha_Fac,
            }
            let result = await Factura.update(updatedObject, { returning: true, where: { id_factura: facturaId } });

            // return the response to client
            if (!result) {
                res.status(500).json({
                    message: "Error, no se pudo actualizar la factura con id = " + req.params.id,
                    error: "No se pudo actualizar",
                });
            }

            res.status(200).json({
                message: "Factura actualizada exitosamente con id = " + facturaId,
                factura: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error, no se puede actualizar la factura con id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try {
        let facturaId = req.params.id;
        let factura = await Factura.findByPk(facturaId);

        if (!factura) {
            res.status(404).json({
                message: "No existe una factura con id = " + facturaId,
                error: "404",
            });
        } else {
            await factura.destroy();
            res.status(200).json({
                message: "Factura eliminada con id = " + facturaId,
                factura: factura,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error, no se puede eliminar la factura con id = " + req.params.id,
            error: error.message,
        });
    }
}