const db = require('../config/db.config.js');
const Producto = db.Producto;

exports.create = (req, res) => {
    let producto = {};

    try {
        // Building a Producto object from uploading request body
        producto.Descripcion = req.body.Descripcion;
        producto.Stock = req.body.Stock;
        producto.Stock_Minimo = req.body.Stock_Minimo;
        producto.Precio_Unitario = req.body.Precio_Unitario;

        // Save to MySQL database
        Producto.create(producto).then(result => {    
            // send uploading message to client
            res.status(200).json({
                message: "Producto creado exitosamente con id = " + result.id_producto,
                producto: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear el producto",
            error: error.message
        });
    }
}

exports.getProductoById = (req, res) => {
    // find all Producto information from
    let productoId = req.params.id;
    Producto.findByPk(productoId)
        .then(producto => {
            res.status(200).json({
                    message: "Producto obtenido exitosamente con id = " + productoId,
                    producto: producto
                });
        })
        .catch(error => {
            // log on console
            console.log(error);

            res.status(500).json({
                message: "Error al obtener el producto",
                error: error
            });
        });
}

exports.updateById = async (req, res) => {
    try {
        let productoId = req.params.id;
        let producto = await Producto.findByPk(productoId);

        if (!producto) {
            // return a response to client
            res.status(404).json({
                message: "No se encontró el producto con id = " + productoId,
                producto: "",
                error: "404"
            });
        } else {    
            // update new change to database
            let updatedObject = {
                Descripcion: req.body.Descripcion,
                Stock: req.body.Stock,
                Stock_Minimo: req.body.Stock_Minimo,
                Precio_Unitario: req.body.Precio_Unitario,
            }
            let result = await Producto.update(updatedObject, { returning: true, where: { id_producto: productoId } });

            // return the response to client
            if (!result) {
                res.status(500).json({
                    message: "Error no se pudo actualizar el producto con id = " + req.params.id,
                    error: "No se pudo actualizar",
                });
            }

            res.status(200).json({
                message: "Producto actualizado exitosamente con id = " + productoId,
                producto: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error no se puede actualizar el producto con id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try {
        let productoId = req.params.id;
        let producto = await Producto.findByPk(productoId);

        if (!producto) {
            res.status(404).json({
                message: "No existe un producto con id = " + productoId,
                error: "404",
            });
        } else {
            await producto.destroy();
            res.status(200).json({
                message: "Producto eliminado con id = " + productoId,
                producto: producto,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error no se puede eliminar el producto con id = " + req.params.id,
            error: error.message,
        });
    }
}
