import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductsContainer from './components/ProductsContainer';
import config from './config';
import { DefaultLayout, WithSidebar } from './layouts';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Product from './pages/Product';
import Register from './pages/Register';
import SearchPage from './pages/SearchPage';
import Store from './pages/Store';
import User from './pages/User';

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
                    >
                        <Route index element={<ProductsContainer />} />
                        {/* <Route path=":params" element={<ProductsContainer />} />     */}
                    </Route>
                    <Route path={config.routes.introduce} />
                    <Route path={config.routes.contact} />
                    <Route path={config.routes.product_detail} element={<Product />} />
                    <Route path={config.routes.userDetail} element={<User />}>
                        <Route path={config.routes.cartDetail} />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                    <Route path="search/:name" element={<SearchPage />} />
                </Route>
                <Route path={config.routes.login} element={<Login />} />
                <Route path={config.routes.register} element={<Register />} />
            </Routes>
        </Router>
    );
}

export default App;
