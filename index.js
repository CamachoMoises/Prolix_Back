const express = require('express');
const passport = require('passport');
const morgan = require("morgan");
const cookieParser = require('cookie-parser');
const session = require('express-session');
const PassportLocal = require('passport-local').Strategy;

const app = express();
app.set('view engine', 'ejs');

morgan.token("person", (request, response) => {
    if(request.body.name){
      return JSON.stringify(request.body);
    }
    return null
  });
  morgan.token("url", (request, response) => {
    return request.url;
  });
  app.use(morgan(":method :url :status :res[content-length] - :response-time ms :person"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('provisional-secret'));
app.use(
	session({
		secret: 'provisional-secret',
		resave: true,
		saveUninitialized: true,
	})
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(
	new PassportLocal(function (username, password, done) {
		if (username === 'admin' && password === '1234') {
			return done(null, { id: 1, name: 'admin' });
		}
		return done(null, false);
	})
);
passport.serializeUser(function (user, done) {
	done(null, user.id);
});
passport.deserializeUser(function (id, done) {
	done(null, { id: 1, name: 'admin' });
});

app.get('/', (req, res) => {
	//If it  logged
    res.send('logged');
	//If not logged redirect to /login
});

app.get('/login', (req, res) => {
	res.render('login');
});

app.post('/login',(req, res)=>{
    console.log('try');
}, passport.authenticate('local',{
    successRedirect:"/",
    failureRedirect:"/login"
}));

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
