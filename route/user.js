const cors = require('cors');

module.exports = (app) => {
	const User = require('../controller/user');
	//TODO: localhost/user/ --> LISTA
	//router.get('/', getUsers)
	app.use(cors());
	app.get('/users', User.List);
	app.post(
		'/api/login',
		(req, res, next) => {
			console.log('body', req.body);
			if (req.body.username) {
				return next();
			}
			console.log('not username');
			res.send('not username');
		},
		User.Authenticate
	);

	app.get('/test', (req, res) => {
		console.log('test');
		res.json({ 'Is just a test': 'not a real route' });
	});
};
