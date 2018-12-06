let express = require('express');
let apis = require('./apis');
let app = express();

// allow custom header and CORS
app.all('*', function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "http://localhost:8000");
	res.header("Access-Control-Allow-Credentials", true);
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By", ' 3.2.1');
	res.header("Content-Type", "application/json;charset=utf-8");
	next();
});

for (let key in apis) {
	app.all(key, function (req, res) {
		res.send(apis[key]);
	});
}
// app.get('/', function (req, res) {
//   res.send({msg:"Hello World!!++22"});
// });

let server = app.listen(3001, function () {
	let host = server.address().address;
	let port = server.address().port;

	console.log('Example app listening at http://localhost:' + port);
});