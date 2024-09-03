module.exports = (sequelize, Sequelize) => {
	const Cliente = sequelize.define('cliente', {	
	  id_cliente: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
    },
	  Nombre: {
			type: Sequelize.STRING(100),
	  },
	  Apellido: {
			type: Sequelize.STRING(100),
  	},
	  Razon_Social: {
			type: Sequelize.STRING(100),
	  },
	  Nit: {
			type: Sequelize.STRING(10),
    },
	  Direccion: {
            type: Sequelize.STRING(100),
      },
	  Telefono: {
            type: Sequelize.STRING(100),
    },
      Email: {
            type: Sequelize.STRING(50),
      },
      Fecha_Ingreso: {
            type: Sequelize.DATE,
    },
      Estatus: {
            type: Sequelize.INTEGER,
    },
    copyrightby: {
		type: Sequelize.STRING,
		defaultValue: 'UMG Antigua'
	  }
	});
	
	return Cliente;
}