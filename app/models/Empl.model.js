module.exports = (sequelize, Sequelize) => {
	const Empleado = sequelize.define('empleado', {	
	  id_empleado: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
    },
	  Primer_Nombre: {
			type: Sequelize.STRING(100),
	  },
	  Segundo_Nombre: {
			type: Sequelize.STRING(100),
  	},
	  Primer_Apellido: {
			type: Sequelize.STRING(100),
	  },
	  Segundo_Apellido: {
			type: Sequelize.STRING(100),
    },
	  Nit: {
            type: Sequelize.STRING(10),
      },
	  Salario: {
            type: Sequelize.INTEGER
    },
      Estatus: {
            type: Sequelize.INTEGER
    
    },
    copyrightby: {
		type: Sequelize.STRING,
		defaultValue: 'UMG Antigua'
	  }
	});
	
	return Empleado;
}