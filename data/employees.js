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
    sql.query('INSERT INTO empleado (`img`,`img2`, `PrimerNombre`, `SegundoNombre`, `PrimerApellido`, `SegundoApellido`, `CorreoElectronico`,`genero`,`cargo`,`civil`,`cedula`,`extencion`,`sangre`,`nacimiento`, `direccion`, `telefono`, `pais`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
    [
        data.img,
		data.img2,
		data.fName,
		data.sName,
		data.lName,
		data.sLName,
		data.email,
		data.gender,
		data.position,
		data.marital,
		data.civ,
		data.ext,
		data.bloodType,
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
	sql.query('UPDATE empleado SET `img` = ? , `img2`=?, `PrimerNombre` = ?, `SegundoNombre` = ? , `PrimerApellido` =  ?, `SegundoApellido` =  ?, `CorreoElectronico` =  ?, `genero` = ?,`civil`=?,`cargo`=?,`cedula`=?,`extencion`,`sangre`=? ,`nacimiento`=?, `direccion` = ?, `telefono` = ?,  `pais` = ? WHERE (`idEmpleado` = ?)',
	[
		data.img,
		data.img2,
		data.fName,
        data.sName,
		data.lName,
        data.sLName,
		data.email,
		data.gender,
		data.position,
		data.marital,
		data.civ,
		data.ext,
		data.bloodType,
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
