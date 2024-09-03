let express = require('express');
let router = express.Router();
 
const clientes = require('../controllers/Clie.controller.js');

// Ruta para cliente
router.post('/api/clientes/create', clientes.create);
router.get('/api/clientes/onebyid/:id_cliente', clientes.getClienteById);
router.put('/api/clientes/update/:id_cliente', clientes.updateById);
router.delete('/api/clientes/delete/:id_cliente', clientes.deleteById);

module.exports = router;

// Ruta para departamento 
const departamentos = require('../controllers/Depa.controller.js');

router.post('/api/departamentos/create', departamentos.create);
router.get('/api/departamentos/onebyid/:id_departamento', departamentos.getDepartamentoById);
router.put('/api/departamentos/update/:id_departamento', departamentos.updateById);
router.delete('/api/departamentos/delete/:id_departamento', departamentos.deleteById);

module.exports = router;
 
// Ruta para empleado
const empleados = require('../controllers/Empl.controller.js');

router.post('/api/empleados/create', empleados.create);
router.get('/api/empleados/onebyid/:id_empleado', empleados.getEmpleadoById);
router.put('/api/empleados/update/:id_empleado', empleados.updateById);
router.delete('/api/empleados/delete/:id_empleado', empleados.deleteById);

module.exports = router;

// Rutas para factura
const facturas = require('../controllers/Fact.controller.js');

router.post('/api/facturas/create', facturas.create);
router.get('/api/facturas/onebyid/:id', facturas.getFacturaById);
router.put('/api/facturas/update/:id', facturas.updateById);
router.delete('/api/facturas/delete/:id', facturas.deleteById);

module.exports = router;

//Rutas para DetalleDeFactura
const factDetalles = require('../controllers/FactDet.controller.js');

router.post('/api/factDetalles/create', factDetalles.create);
router.get('/api/factDetalles/onebyid/:id', factDetalles.getFactDetalleById);
router.put('/api/factDetalles/update/:id', factDetalles.updateById);
router.delete('/api/factDetalles/delete/:id', factDetalles.deleteById);

module.exports = router;

// Rutas para producto
const productos = require('../controllers/Prod.controller.js');

router.post('/api/productos/create', productos.create);
router.get('/api/productos/onebyid/:id', productos.getProductoById);
router.put('/api/productos/update/:id', productos.updateById);
router.delete('/api/productos/delete/:id', productos.deleteById);

module.exports = router;

// Ruta para proveedor
const proveedores = require('../controllers/Prove.controller.js');

router.post('/api/proveedores/create', proveedores.create);
router.get('/api/proveedores/onebyid/:id', proveedores.getProveedorById);
router.put('/api/proveedores/update/:id', proveedores.updateById);
router.delete('/api/proveedores/delete/:id', proveedores.deleteById);

module.exports = router;
