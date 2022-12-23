import config from '~/config';
import { Container, Row } from 'react-bootstrap';
import './Sidebar.scss';
import MainNavItem from '../MainNavbar/MainNavItem';

const SIDEBAR_ITEMS = [
    {
        label: 'Nam',
        link: config.routes.home,
    },
    {
        label: 'Nữ',
        link: config.routes.home,
    },
];

function Sidebar() {
    return (
        <aside className="sidebar-wrapper">
            <Container
                fluid
                style={{
                    backgroundColor: '#ffffff',
                    boxShadow: '0px 2px 12px #ccc',
                }}
            >
                <Row className="justify-content-center align-items-center">
                    <p className="m-0 sidebar-title" style={{ textAlign: 'center' }}>
                        DANH MỤC
                    </p>
                </Row>
                <Row>
                    <MainNavItem navItems={SIDEBAR_ITEMS} />
                </Row>
            </Container>
        </aside>
    );
}

export default Sidebar;
