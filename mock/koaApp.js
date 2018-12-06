require('babel-register');

const Koa = require('koa');
const app = new Koa();

// // logger

// app.use(async (ctx, next) => {
// 	await next();
// 	const rt = ctx.response.get('X-Response-Time');
// 	console.log(`${ctx.method} ${ctx.url} - ${rt}`);
// });

// // x-response-time

// app.use(async (ctx, next) => {
// 	const start = Date.now();
// 	await next();
// 	const ms = Date.now() - start;
// 	ctx.set('X-Response-Time', `${ms}ms`);
// });

app.use(async ctx => {
	console.log(ctx.request);
	ctx.cookies.set('code', '1111');
	ctx.body = 'Hello World!';
});

app.listen(3000);
