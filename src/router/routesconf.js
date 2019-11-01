import loadable from '@loadable/component';
const Home = loadable(() => import('../containers/Home/Home'));
const Test = loadable(() => import('../containers/Test'));


// import asyncComponent from '@common/asyncComponent'; // 动态加载容器组件
// const Home = asyncComponent(() => import('../containers/Home/Home'));
// const Test = asyncComponent(() => import('../containers/Test/Test'));

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