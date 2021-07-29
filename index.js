require('dotenv').config();
const express = require('express');
const passport = require('passport');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const PassportLocal = require('passport-local').Strategy;

const app = express();

app.set('view engine', 'ejs');

morgan.token('person', (req, res) => {
	if (req.body.username) {
		return JSON.stringify(req.body);
	}
	return null;
});
morgan.token('url', (req, res) => {
	return req.url;
});

app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('provisional-secret'));
app.use(
	session({
		secret: 'provisional-secret',
		resave: true,
		saveUninitialized: true,
	})
);
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
passport.use(
	new PassportLocal(function (username, password, done) {
		if (username === 'test@test.com' && password === 'admin') {
			return done(null, { id: 1, name: 'test@test.com' });
		}
		return done(null, false);
	})
);
passport.serializeUser(function (user, done) {
	done(null, user.id);
});

passport.deserializeUser(function (id, done) {
	done(null, { id: 1, name: 'test@test.com' });
});
require('./route/user')(app);

// app.get(
// 	'/',
// 	(req, res, next) => {
// 		console.log(req.isAuthenticated());
// 		if (req.isAuthenticated()) {
// 			console.log('logged');
// 			return next();
// 		}
// 		console.log('OJO');
// 		res.json({"":""});
// 	},
// 	(req, res) => {
// 		//If it  logged
// 		res.json({"":""});
// 		//If not logged redirect to /login
// 	}
// );

// app.post(
// 	'/api/login1',
// 	(req, res, next) => {
// 		console.log('body', req);
// 		if (req.body.username) {
// 			return next();

// 		}
// 		console.log('not username');
// 		res.send('not username');
// 	},
// 	passport.authenticate('local', {
// 		successRedirect: '/',
// 		failureRedirect: '/login',
// 		failureFlash: true,
// 	})
// );

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
