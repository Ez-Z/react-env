// 引入express中间件
let express = require('express');

let app = express();
// 指定启动服务器到哪个文件夹，我这边指的是dist文件夹
app.use(express.static('./dist'));
app.get('/*', function(req, res) {
	res.sendfile('dist/index.html');
});
// 监听端口为3000
let server = app.listen(3000, function () {
	let port = server.address().port;
	console.info('复制打开浏览器', 'http://localhost:' + port);
});