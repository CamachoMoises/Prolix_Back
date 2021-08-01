const cors = require('cors');

module.exports = (app)=>{
    const Employee = require("../controller/employees");
	app.use(cors());
    app.get("/employees", Employee.List);
    app.post("/employee", Employee.add);
    app.delete("/employee/:id", Employee.delete);
}