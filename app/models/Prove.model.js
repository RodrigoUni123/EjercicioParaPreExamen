module.exports = (sequelize, Sequelize) => {
	const Proveedor = sequelize.define('proveedor', {	
	  id_proveedor: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
    },
	  Empresa: {
			type: Sequelize.STRING(100),
	  },
	  Telefono: {
			type: Sequelize.INTEGER,
  	},
	  Nit: {
			type: Sequelize.STRING(30),
	  },
	  Ciudad: {
			type: Sequelize.STRING(100),
    },
	  Pais: {
            type: Sequelize.STRING(100),
      },
	  Contacto: {
            type: Sequelize.STRING(100),
    },
      Email: {
            type: Sequelize.STRING(100),
      },
      Telefono_contacto: {
            type: Sequelize.INTEGER,
    },
      Estatus: {
            type: Sequelize.INTEGER,
    },
    copyrightby: {
		type: Sequelize.STRING,
		defaultValue: 'UMG Antigua'
	  }
	});
	
	return Proveedor;
}