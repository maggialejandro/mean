module.exports = function(sequelize, Seq){

	return sequelize.define('usuario', {
		id : { 
			type : Seq.INTEGER, 
			primaryKey: true, 
			autoIncrement: true
		},
		name : {
			type : Seq.STRING(51),
			allowNull: true,
			validate: {
				len: [2, 50]
			}
		},
		apellido : {
			type : Seq.STRING(51),
			allowNull: true,
			validate: {
				len: [2, 50]
			}
		},
		rol_id: {
			type: Seq.INTEGER,
			references: "rol",
			referencesKey: "id"
		},
		email: {
			type: Seq.STRING,
			unique: true,
			allowNull: false,
			validate : {
				isEmail : true
			}
		},
		password : {
			type : Seq.STRING(100),
			allowNull: false,
			validate : {
				len : [ 3, 100 ]
			}
		},
		nickname : {
			type : Seq.STRING(80),
			unique: true,
			allowNull: true
		}
	},{
		timestamps: false,
		tableName : "usuario",
		instanceMethods: {
			toJSON: function() { 
				var values = this.values;
				delete values.password;

				if (this.client) {
					values.client = this.client.toJSON();
				}

				return values;
			}
		}
	});
};
