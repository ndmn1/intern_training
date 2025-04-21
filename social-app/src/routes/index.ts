import * as constants from '@/constants';

import HomePage from '@/pages/Home';
import NewPage from '@/pages/New';
import PostPage from '@/pages/Post';
import UserPage from '@/pages/User';

type RouteItem = {
	key: string;
	path: string;
	component: React.ComponentType;
	layout?: React.ComponentType;
};

const routing: RouteItem[] = [
	{
		key: 'home',
		path: constants.HOME,
		component: HomePage,
	},
	{
		key: 'new',
		path: constants.NEW,
		component: NewPage,
	},
	{
		key: 'posts',
		path: constants.POST,
		component: PostPage,
	},
	{
		key: 'users',
		path: constants.USER,
		component: UserPage,
	},
];

export default routing;