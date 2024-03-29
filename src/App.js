import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import config from './config';
import { DefaultLayout } from './layouts';
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
import ProtectedRoutes from './ProtectedRoutes/protected-routes';
import AdminNotify from './pages/Admin/pages/AdminNotify';
import Notify from './pages/Notify';
import Ad from './pages/Admin/pages/Ad';
import Brand from './pages/Admin/pages/Brand';
import CategoryAndSeries from './pages/Admin/pages/CategoryAndSeries/CategoryAndSeries';
import { ToastContainer } from 'react-toastify';
import Order from './pages/Order/Order';
import AddNotify from './pages/Admin/pages/AddNotify/AddNotify';
import AdminOrderDetail from './pages/Admin/pages/AdminOrderDetail/AdminOrderDetail';
import ForgetPw from './pages/ForgetPassword/ForgetPw';
import AccountDetail from './pages/Admin/pages/AccountDetail/AccountDetail';
import ScrollTotop from './components/ScrollTotop';
import PolicyPage from './pages/Police/PolicyPage';
import WarrantyPolicy from './pages/Police/WarrantyPolicy';
import ShippingPolicy from './pages/Police/ShippingPolicy';
import AdminLogin from './pages/Admin/pages/AdminLogin/AdminLogin';
import ProtectedRoutesAdmin from './ProtectedRoutes/protected-routes-admin';
import Employee from './pages/Admin/pages/Employee/Employee';
function App() {
    //test
    return (
        <>
            <Router>
                <ScrollTotop />
                <Routes>
                    <Route path={config.routes.home} element={<DefaultLayout />}>
                        <Route index element={<Home />} />
                        <Route path={config.routes.store} element={<Store />}></Route>
                        <Route path={config.routes.introduce} />
                        <Route path={config.routes.contact} />
                        <Route path={config.routes.product_detail} element={<Product />} />
                        <Route element={<ProtectedRoutes roles={['admin', 'employee', 'customer']} />}>
                            <Route path={config.routes.user} element={<User />}>
                                <Route index element={<Profile />} />
                                <Route path={config.routes.cartDetail} />
                                <Route path={config.routes.userDetail} element={<Profile />} />
                                <Route path={config.routes.changePassword} element={<ChangePassword />} />
                                <Route path={config.routes.history} element={<History />} />
                            </Route>
                            <Route path={config.routes.order} element={<Order />} />
                        </Route>
                        <Route path={config.routes.notify} element={<Notify />} />
                        <Route path={config.routes._404} element={<NotFound />} />
                        <Route path={'/police'} element={<PolicyPage />}>
                            <Route index element={<WarrantyPolicy />} />
                            <Route path="chinh-sach-bao-hanh" element={<WarrantyPolicy />} />
                            <Route path="chinh-sach-van-chuyen" element={<ShippingPolicy />} />
                        </Route>
                    </Route>
                    <Route path={config.routes.login} element={<Login />} />
                    <Route path={'/admin/login'} element={<AdminLogin />} />
                    <Route path={config.routes.register} element={<Register />} />
                    <Route path={config.routes.forgot_pw} element={<ForgetPw />} />
                    <Route element={<ProtectedRoutesAdmin roles={['admin', 'employee']} />}>
                        <Route path={config.routes.adminPage} element={<Admin />}>
                            <Route path={config.routes.memberProfile} element={<MemberProfile />} />
                            <Route path={config.routes.adminNotify} element={<AdminNotify />} />
                            <Route element={<ProtectedRoutesAdmin roles={['admin']} />}>
                                <Route index element={<Dashboard />} />
                                <Route path={config.routes.dashboard} element={<Dashboard />} />
                                <Route path={config.routes.account} element={<Accounts />} />
                                <Route path={config.routes.accountDetail} element={<AccountDetail />} />
                                <Route path={config.routes.addAccount} element={<AddAccount />} />
                                <Route path={config.routes.adminProducts} element={<AdminProducts />} />
                                <Route path={config.routes.addProduct} element={<AddProduct />} />
                                <Route path={config.routes.updateProduct} element={<UpdateProduct />} />
                                <Route path={config.routes.adminOrders} element={<AdminOrder />} />
                                <Route path={config.routes.adminOrderDetail} element={<AdminOrderDetail />} />
                                <Route path={config.routes.addNotify} element={<AddNotify />} />
                                <Route path={config.routes.Advertising} element={<Ad />} />
                                <Route path={config.routes.Brand} element={<Brand />} />
                                <Route path={config.routes.Category} element={<CategoryAndSeries />} />
                            </Route>
                            <Route element={<ProtectedRoutesAdmin roles={['employee']} />}>
                                <Route path={'employee'} element={<Employee />} />
                                <Route path={'employee/order-detail'} element={<AdminOrderDetail />} />
                            </Route>
                        </Route>
                    </Route>
                </Routes>
            </Router>
            <ToastContainer />
        </>
    );
}

export default App;
