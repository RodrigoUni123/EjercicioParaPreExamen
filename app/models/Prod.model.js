module.exports = (sequelize, Sequelize) => {
	const Producto = sequelize.define('producto', {	
	  id_producto: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
    },
	  Descripcion: {
			type: Sequelize.STRING(100),
	  },
	  Stock: {
			type: Sequelize.INTEGER,
  	},
	  Stock_Minimo: {
			type: Sequelize.INTEGER,
	  },
	  Precio_Unitario: {
			type: Sequelize.FLOAT,
    },
    copyrightby: {
		type: Sequelize.STRING,
		defaultValue: 'UMG Antigua'
	  }
	});
	
	return Producto;
}