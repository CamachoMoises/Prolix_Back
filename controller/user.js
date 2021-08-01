const User = require('../data/user');

exports.List = (req, res) => {
	User.List((err, data) => {
		if (err)
			res.status(500).send({
				message: err.message || 'Some error occurred while retrieving Users.',
			});
		else res.send(data);
	});
};

exports.Authenticate = (req, res, next) => {
	// Validation area
	const data = {
		user1: req.body.username,
		pwd1: req.body.password,
	};
	User.Find(data, (error, results) => {
		if (error) {
			console.log('Error in the database');
			return res.status(400).json({ statusCode: 400, message: 'Error in the database' });
		}
		if (results[0].length < 1) {
			console.log('User not exist');
			return res.status(400).json({ statusCode: 400, message: 'User not exist' });
		}
		console.log('userVerified');

		User.Autenticate(data, (error, results) => {
			if (error) {
				console.log('Error in the database');
				return res.status(400).json({ statusCode: 400, message: 'Error in the database' });
			}
			const sqlRes = results[0];
			if (sqlRes[0]) {
				const userF = {
					firstName: sqlRes[0].PrimerNombre,
					lastName: sqlRes[0].PrimerApellido,
					password: 'secret',
					token: 'token',
				};
				return res.json(userF);
			}
			// return res.status(200).send({
			// 	success: 1,
			// 	data: results
			//
			// });
			console.log(`the password does not match the User: ${data.user1}`);
			return res.status(400).json({ statusCode: 400, message: `the password does not match the User: ${data.user1}` });
		});
	});
};
