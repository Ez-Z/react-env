if ("production" !== process.env.NODE_ENV) {
	module.exports = require('./configureStore.dev');
} else {
	module.exports = require('./configureStore.dist');
}