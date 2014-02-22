module.exports = function(sequelize, Seq){

	return sequelize.define('rol',{
		id : { 
			type : Seq.INTEGER, 
			primaryKey: true,
			autoIncrement: true
		},
		nombre : {
			type : Seq.STRING(100)
		},
		estado : {
			type : Seq.INTEGER
		}
	},{
		timestamps: false,
		tableName : "rol"
	});

};