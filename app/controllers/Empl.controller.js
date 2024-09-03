const db = require('../config/db.config.js');
const Empleado = db.Empleado;

exports.create = (req, res) => {
    let empleado = {};

    try {
        // Building Customer object from upoading requests body
        empleado.Primer_Nombre = req.body.Primer_Nombre;
        empleado.Segundo_Nombre = req.body.Segundo_Nombre;
        empleado.Primer_Apellido = req.body.Primer_Apellido;
        empleado.Segundo_Apellido = req.body.Segundo_Apellido;
        empleado.Nit = req.body.Nit;
        empleado.Salario = req.body.Salario;
        empleado.Estatus = req.body.Estatus;

        // Save to MySQL database
        Empleado.create(empleado).then(result => { 
            //send uploading message to client   
            res.status(200).json({
                message: "Upload Successfully a Empleado with id = " + result.id_empleado,
                empleado: result,
            });
        });
    } catch(error) {
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
}

exports.getEmpleadoById = (req, res) => {
    let empleadoId = req.params.id_empleado;
    Empleado.findByPk(empleadoId)
        .then(empleado => {
                res.status(200).json({
                    message: " Successfully Get a Customer with id = " + empleadoId,
                    empleado: empleado
                });
            }) 

            .catch(error => {
            //log on console    
            console.log(error);

            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}

// Actualizar Empleado por ID
exports.updateById = async (req, res) => {
    try {
        let empleadoId = req.params.id_empleado;
        let empleado = await Empleado.findByPk(empleadoId);

        if (!empleado) {
            //return a response to client
            res.status(404).json({
                message: "Not found for updating a Empleado with id = " + empleadoId,
                empleado: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                Primer_Nombre: req.body.Primer_Nombre,
                Segundo_Nombre: req.body.Segundo_Nombre,
                Primer_Apellido: req.body.Primer_Apellido,
                Segundo_Apellido: req.body.Segundo_Apellido,
                Nit: req.body.Nit,
                Salario: req.body.Salario,
                Estatus: req.body.Estatus,
            }
            let result = await Empleado.update(updatedObject, { returning: true, where: { id_empleado: empleadoId } });

            //return the response to client
            if (!result) {
                res.status(500).json({
                    message: "Error -> Can not update a Empleado with id = " + req.params.id_empleado,
                    error: "Can NOT Update",
                });
            } 
            res.status(200).json({
                message: "Update successfully a Empleado with = " + empleadoId,
                    empleado: updatedObject,
                });
            }
        } catch(error){
            res.status(500).json({
            message: "Error -> Can not update a customer with id = " + req.params.id_empleado,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try {
        let empleadoId = req.params.id_empleado;
        let empleado = await Empleado.findByPk(empleadoId);

        if (!empleado) {
            res.status(404).json({
                message: "Does Not exist a Empleado with id = " + empleadoId,
                error: "404",
            });
        } else {
            await empleado.destroy();
            res.status(200).json({
                message: "Delete Successfully a Empleado with id = " + empleadoId,
                empleado: empleado,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can Not delete a customer with id = " + req.params.id_empleado,
            error: error.message,
        });
    }
}