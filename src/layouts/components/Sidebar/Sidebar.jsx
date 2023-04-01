import { Container, Nav, Row } from 'react-bootstrap';
import './Sidebar.scss';
import MainNavItem from '../MainNavbar/MainNavItem';

const CATEGORY = [
    {
        label: 'Gaming',
        link: '#',
    },
    {
        label: 'Văn Phòng',
        link: '#',
    },
    { label: 'Đồ họa', link: '#' },
];

function Sidebar() {
    const handleClickNavItem = ({ sidebarItem }) => {
        alert('da cho danh mucj:', sidebarItem.label);
    };
    return (
        <aside className="sidebar-wrapper">
            <Container fluid className="content-box">
                <Row className="justify-content-center align-items-center">
                    <p className="sidebar-title text-center mb-4">DANH MỤC</p>
                </Row>
                <Row>
                    <Nav as="ul" className=" header-offcanvas-nav">
                        {CATEGORY.map((sidebarItem, idx) => (
                            <Nav.Item as="li" className="d-flex m-0 nav-item" key={idx}>
                                {sidebarItem.items ? (
                                    <MainNavItem item={sidebarItem} handleClickNavItem={handleClickNavItem} />
                                ) : (
                                    <span className="nav-item-label" onClick={() => handleClickNavItem(sidebarItem)}>
                                        {sidebarItem.label}
                                    </span>
                                )}
                            </Nav.Item>
                        ))}
                    </Nav>
                </Row>
            </Container>
        </aside>
    );
}

export default Sidebar;
