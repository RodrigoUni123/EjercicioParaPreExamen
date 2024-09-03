const env = require('./env.js');
 
const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  dialectOptions:{
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  operatorsAliases: false,
 
  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle,
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
 
db.Departamento = require('../models/Depa.model.js')(sequelize, Sequelize);
db.Empleado = require('../models/Empl.model.js')(sequelize, Sequelize);
db.Cliente = require('../models/Clie.model.js')(sequelize, Sequelize);
db.Proveedor = require('../models/Prove.model.js')(sequelize, Sequelize);
db.Producto = require('../models/Prod.model.js')(sequelize, Sequelize);
db.Factura = require('../models/Fact.model.js')(sequelize, Sequelize);
db.FactDetalle = require('../models/FactDet.model.js')(sequelize, Sequelize);
 
module.exports = db;