import PropTypes from 'prop-types';
import Header from '~/layouts/components/Header';

import { Row, Container } from 'react-bootstrap';
import './DefaultLayout.scss';
import Footer from '../components/Footer';
import MainNavbar from '../components/MainNavbar';
function DefaultLayout({ children }) {
    return (
        // <div className="d-flex flex-column ">
        //     <div>
        //         <Header />
        //     </div>
        //     <div className="container-fluid p-0">
        //         <div className="slider">
        //             <p className="text-danger">Slide</p>
        //         </div>
        //     </div>
        //     <div className=" container-fluid p-0">
        //         <div className="d-flex flex-row container  p-0">
        //             <div className="col-md-3 d-none d-lg-block">
        //                 <Sidebar />
        //             </div>
        //             <div className="col-lg-9 col-xs-12">{children}</div>
        //         </div>
        //     </div>
        //     <footer className="container-fluid p-0" style={{ height: '200px', backgroundColor: 'red' }}></footer>
        // </div>
        <Container fluid>
            <Row>
                <Header />
            </Row>
            {/* <Row>
                <MainNavbar />
            </Row> */}
            <Row className="justify-content-center">{children}</Row>
            <Row>
                <Footer />
            </Row>
        </Container>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
