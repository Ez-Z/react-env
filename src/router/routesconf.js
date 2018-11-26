import LazyLoad from '@common/LazyLoad/LazyLoad'; // 按需加载容器组件
const Home = LazyLoad(() => import('../containers/Home/Home'));
const Test = LazyLoad(() => import('../containers/Test/Test'));

const routes =  [
	{
		path: '/',
		exact: true,
		component: Home
	},
	{
		path: '/test/:id',
		component: Test
	},
];

export default routes;