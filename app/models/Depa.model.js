
module.exports = (sequelize, Sequelize) => {
	const Departamento = sequelize.define('departamento', {	
	  id_departamento: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
    },
	  Descripcion: {
			type: Sequelize.STRING(80),
	  },
	  copyrightby: {
		type: Sequelize.STRING,
		defaultValue: 'UMG Antigua'
	  }
	});
	
	return Departamento;
}