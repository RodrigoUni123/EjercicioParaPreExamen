module.exports = (sequelize, Sequelize) => {
	const FactDetalle = sequelize.define('factdetalle', {	
	  id_Linea: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
    },
	  Cantidad: {
			type: Sequelize.INTEGER,

    },
    copyrightby: {
		type: Sequelize.STRING,
		defaultValue: 'UMG Antigua'
	  }
	});
	
	return FactDetalle;
}