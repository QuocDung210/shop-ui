import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import config from './config';
import { DefaultLayout, WithSidebar } from './layouts';
import Admin from './pages/Admin';
import Dashboard from './pages/Admin/pages/Dashboard/Dashboard';
import Accounts from './pages/Admin/pages/Accounts';
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
import AddProduct from './pages/Admin/pages/AddProduct';
import AdminProducts from './pages/Admin/pages/AdminProducts';
import AddAccount from './pages/Admin/pages/AddAccount';
import UpdateProduct from './pages/Admin/pages/UpdateProduct';
import AdminOrder from './pages/Admin/pages/AdminOrder';
import MemberProfile from './pages/Admin/pages/MemberProfile';

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
                <Route path="/admin" element={<Admin />}>
                    <Route index element={<Dashboard />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="account" element={<Accounts />}></Route>
                    <Route path="add-account" element={<AddAccount />} />
                    <Route path="products" element={<AdminProducts />} />
                    <Route path="add-product" element={<AddProduct />} />
                    <Route path="update-product" element={<UpdateProduct />} />
                    <Route path="order" element={<AdminOrder />} />
                    <Route path="notify" element={<Accounts />} />
                    <Route path="member-profile" element={<MemberProfile />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
