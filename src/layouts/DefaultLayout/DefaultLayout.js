import PropTypes from 'prop-types';
import Header from '~/layouts/components/Header';

import { Row, Container } from 'react-bootstrap';
import './DefaultLayout.scss';
import Footer from '../components/Footer';
import Breadcrumb from '~/components/Breadcrumb';
function DefaultLayout({ children }) {
    return (
        <Container fluid>
            <Row>
                <Header />
            </Row>
            {/* <Row>
                <MainNavbar />
            </Row> */}
            <Row>
                <Breadcrumb />
            </Row>
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
