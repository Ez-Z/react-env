/**
 * Mocking client-server processing
 */
let Mock = require('mockjs');
Random = Mock.Random;
let _products = [];
for (let i = 0; i < 10; i++){
	_products.push({
		id: Random.natural(0, 10000),
		title: Random.cword(4, 8),
		price: Random.float(0, 1000, 2, 2),
		inventory: Random.natural(3, 10)
	});
}

// const _products = [
// 	{"id": 1, "title": "iPad 4 Mini", "price": 500.01, "inventory": 2},
// 	{"id": 2, "title": "H&M T-Shirt White", "price": 10.99, "inventory": 10},
// 	{"id": 3, "title": "Charli XCX - Sucker CD", "price": 19.99, "inventory": 5}
// ];

module.exports = _products;
