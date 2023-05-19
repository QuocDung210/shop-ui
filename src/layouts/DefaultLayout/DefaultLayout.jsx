import PropTypes from 'prop-types';
import Header from '~/layouts/components/Header';

import { Row, Container } from 'react-bootstrap';
import './DefaultLayout.scss';
import Footer from '../components/Footer';
import Breadcrumb from '~/components/Breadcrumb';
import { Outlet } from 'react-router-dom';
function DefaultLayout() {
    return (
        <Container
            fluid
            className="d-flex flex-column"
            style={{ minHeight: '100vh', backgroundColor: 'var(--background-color)' }}
        >
            <Row>
                <Header />
            </Row>
            {/* <Row>
                <MainNavbar />
            </Row> */}
            <Row>
                <Breadcrumb />
            </Row>
            <Row className="justify-content-center flex-fill">
                <Outlet />
            </Row>
            <Row>
                <Footer />
            </Row>
        </Container>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node,
};

export default DefaultLayout;
