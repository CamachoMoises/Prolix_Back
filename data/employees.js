const sql = require('./database');

const Employees = function (employee){
    this.test=employee.test
};

Employees.list = (result) => {
	sql.query('CALL traerEmpleados', (err, res) => {
		if (err) {
			console.log('error: ', err);
			result(null, err);
			return;
		}
		result(null, res);
	});
};

 Employees.add=(data, result)=>{
     console.log(data);
    sql.query('INSERT INTO empleado (`img`, `PrimerNombre`, `SegundoNombre`, `PrimerApellido`, `SegundoApellido`, `CorreoElectronico`,`genero`,`nacimiento`, `direccion`, `telefono`, `pais`) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
    [
        data.img,
		data.fName,
		data.sName,
		data.lName,
		data.sLName,
		data.email,
		data.gender,
		data.bDate,
		data.address,
		data.mobile,
		data.country,
    ],(err, res)=>{
        if (err) {
			console.log('error: ', err);
			result(null, err);
			return;
		}
		result(null, res);
    })
};

Employees.delete=(data, result)=>{
	sql.query('DELETE FROM empleado WHERE idEmpleado=?',[data],(err, res)=>{
		if (err) {
			console.log('error: ', err);
			result(null, err);
			return;
		}
		result(null, res);
	})
};

Employees.update=(data, result)=>{
	sql.query('UPDATE empleado SET `img` = ? , `PrimerNombre` = ?, `SegundoNombre` = ? , `PrimerApellido` =  ?, `SegundoApellido` =  ?, `CorreoElectronico` =  ?, `genero` = ?, `nacimiento`=?, `direccion` = ?, `telefono` = ?,  `pais` = ? WHERE (`idEmpleado` = ?)',
	[
		data.img,
		data.fName,
        data.sName,
		data.lName,
        data.sLName,
		data.email,
		data.gender,
		data.bDate,
		data.address,
		data.mobile,
		data.country,
		data.id
	],
	 (err,res)=>{

	 })
}

module.exports = Employees;
