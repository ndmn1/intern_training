import * as constants from '@/constants';

import HomePage from '@/pages/Home';
import NewPage from '@/pages/New';
import EditPage from '@/pages/Edit';
import TrashPage from '@/pages/Trash';

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
		key: 'edit',
		path: constants.EDIT,
		component: EditPage,
	},
	{
		key: 'trash',
		path: constants.TRASH,
		component: TrashPage,
	},
];

export default routing;