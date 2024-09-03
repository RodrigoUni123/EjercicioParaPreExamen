module.exports = (sequelize, Sequelize) => {
	const Factura = sequelize.define('factura', {	
	  id_factura: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
    },
	  No_Factura: {
			type: Sequelize.INTEGER,
	  },
	  Serie: {
			type: Sequelize.STRING(20),
  	},
	  Fecha_Fac: {
			type: Sequelize.DATE,
    
    },
    copyrightby: {
		type: Sequelize.STRING,
		defaultValue: 'UMG Antigua'
	  }
	});
	
	return Factura;
}