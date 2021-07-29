const User = require('../data/user');

let userl = {
	username: 'admin',
	password: '1234',
	firstName: 'Moises',
	lastName: 'Camacho',
	token: 'test',
};
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
	User.Autenticate(data, (error, results) => {
		if (error) {
			console.log(error);
			return res.status(400).json({ statusCode: 400, message: 'User not exist' });
		}
        const data=results[0];
        console.log('Results', data[0] );
        return res.json(userl)
		// return res.status(200).send({
		// 	success: 1,
		// 	data: results
        //     
		// });
	});
};
