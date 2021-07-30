const sql = require('./database');

// constructor
const User = function (user) {
	this.nombreusuario = user.nombreusuario;
	this.claveusuario = user.claveusuario;
	this.estado = user.estado;
};

//SELECT * FROM usuario
User.List = (result) => {
	sql.query('CALL sp_listado_usuario', (err, res) => {
		if (err) {
			console.log('error: ', err);
			result(null, err);
			return;
		}

		console.log('Usuario: ', res);
		result(null, res);
	});
};

User.Find = (data, result) => {
	sql.query('CALL existe_usuario(?)', [data.user1], (err, res, fields) => {
		if (err) {
			console.log('error:', err);
			result(null, err);
			return;
		}
		result(null, res);
	});
};

User.Autenticate = (data, result) => {
	sql.query('CALL sp_validar_usuario(?,?)', [data.user1, data.pwd1], (err, res, fields) => {
		if (err) {
			console.log('error: ', err);
			result(null, err);
			return;
		}
		result(null, res);
	});
};

module.exports = User;
