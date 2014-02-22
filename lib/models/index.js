var Sequelize  = require('sequelize');
var config  = require('./config').database;

var sequelize = new Sequelize(config.database, config.username, config.password, {
	sync: { force: true },
	syncOnAssociation: true
}
);

var models = [ 
'rol',
'usuario'
];

models.forEach(function(model){
	module.exports[model] = sequelize.import( __dirname + "/" + model );
});

(function(m){

	m.rol.hasMany(m.usuario, { foreignKey: 'rol_id', foreignKeyConstraint: true});

})(module.exports);


module.exports.sequelize = sequelize;