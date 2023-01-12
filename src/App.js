import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import config from './config';
import { DefaultLayout, WithSidebar } from './layouts';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Product from './pages/Product';
import Register from './pages/Register';
import Store from './pages/Store';
import User from './pages/User';
import ChangePassword from './pages/User/ChangePassword';
import History from './pages/User/History';
import Profile from './pages/User/Profile';

function App() {
    return (
        // <Router>
        //     <div className="App">
        //         <Routes>
        //             {publicRoutes.map((route, index) => {
        //                 let Layout = DefaultLayout;
        //                 if (route.layout) {
        //                     Layout = route.layout;
        //                 } else if (route.layout === null) {
        //                     Layout = Fragment;
        //                 }
        //                 const Page = route.component;
        //                 return (
        //                     <Route
        //                         key={index}
        //                         path={route.path}
        //                         element={
        //                             <Layout>
        //                                 <Page />
        //                             </Layout>
        //                         }
        //                     />
        //                 );
        //             })}
        //         </Routes>
        //     </div>
        // </Router>
        <Router>
            <Routes>
                <Route path={config.routes.home} element={<DefaultLayout />}>
                    <Route index element={<Home />} />
                    <Route
                        path={config.routes.store}
                        element={
                            <WithSidebar>
                                <Store />
                            </WithSidebar>
                        }
                    ></Route>
                    <Route path={config.routes.introduce} />
                    <Route path={config.routes.contact} />
                    <Route path={config.routes.product_detail} element={<Product />} />
                    <Route path={config.routes.user} element={<User />}>
                        <Route path={config.routes.cartDetail} />
                        <Route path={config.routes.userDetail} element={<Profile />} />
                        <Route path={config.routes.changePassword} element={<ChangePassword />} />
                        <Route path={config.routes.history} element={<History />} />
                    </Route>
                    <Route path={config.routes._404} element={<NotFound />} />
                </Route>
                <Route path={config.routes.login} element={<Login />} />
                <Route path={config.routes.register} element={<Register />} />
            </Routes>
        </Router>
    );
}

export default App;
