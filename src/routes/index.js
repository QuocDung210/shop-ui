import { WithSidebar } from '~/layouts';
import Home from '~/pages/Home';
import Login from '~/pages/Login';
import NotFound from '~/pages/NotFound';
import Product from '~/pages/Product';
import Register from '~/pages/Register';
import SearchPage from '~/pages/SearchPage';
import Store from '~/pages/Store';
import config from '../config';

const publicRoutes = [
    { path: config.routes.home, component: Home },
    {
        path: config.routes.store,
        component: Store,
        layout: WithSidebar,
    },
    { path: config.routes.introduce, component: Home },
    {
        path: config.routes.search,
        component: SearchPage,
        layout: WithSidebar,
    },
    {
        path: config.routes.product_detail,
        component: Product,
    },
    {
        path: config.routes.login,
        component: Login,
        layout: null,
    },
    {
        path: config.routes.register,
        component: Register,
        layout: null,
    },
    {
        path: config.routes._404,
        component: NotFound,
    },
];

export { publicRoutes };
