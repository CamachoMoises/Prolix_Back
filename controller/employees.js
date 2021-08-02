const Employee = require('../data/employees');

exports.List = (req, res) => {
	Employee.list((err, data) => {
		if (err)
			res.status(500).send({
				message: err.message || 'Some error occurred while retrieving Users.',
			});
		else {
			const employees = data[0];
			let results = [];
			employees.forEach((employee) => {
				results.push({
					id: employee.idEmpleado,
					img: employee.img,
					fName: employee.PrimerNombre,
					email: employee.CorreoElectronico,
					gender: employee.genero,
					bDate: employee.nacimiento,
					address: employee.direccion,
					mobile: employee.telefono,
					country: employee.pais,
					lName: employee.PrimerApellido,
				});
			});
			res.json(results);
		}
	});
};
exports.add = (req, res) => {
	console.log('employee', req.body);
	const data = {
		img: req.body.img,
		fName: req.body.fName,
		sName: req.body.sName,
		lName: req.body.lName,
		sLName: req.body.sLName,
		email: req.body.email,
		gender: req.body.gender,
		bDate: req.body.bDate,
		address: req.body.address,
		mobile: req.body.mobile,
		country: req.body.country,
	};
	Employee.add(data, (err, res) => {
		if (err) {
			console.log('Error in the database');
			return res.status(400).json({ statusCode: 400, message: 'Error in the database' });
		}
	});
	return res.status(200).json({ statusCode: 200, message: `data saved` });
};
exports.delete = (req, res) => {
	console.log('delete employee id:', req.params.id);
	const data = req.params.id;
	Employee.delete(data, (err, res) => {
		if (err) {
			console.log('Error in the database');
			return res.status(400).json({ statusCode: 400, message: 'Error in the database' });
		}
	});
	return res.status(200).json({ statusCode: 200, message: `data erase` });
};
exports.update = (req, res) => {	
	console.log('Update employee id:', req.params.id);
	const data = {
		img: req.body.img,
		fName: req.body.fName,
		sName: req.body.sName,
		lName: req.body.lName,
		sLName: req.body.sLName,
		email: req.body.email,
		gender: req.body.gender,
		bDate: req.body.bDate,
		address: req.body.address,
		mobile: req.body.mobile,
		country: req.body.country,
		id: req.params.id
	};
	Employee.update(data, (err, res) => {
		if (err) {
			console.log('Error in the database');
			return res.status(400).json({ statusCode: 400, message: 'Error in the database' });
		}
	});
	return res.status(200).json({ statusCode: 200, message: `data saved` });
};
