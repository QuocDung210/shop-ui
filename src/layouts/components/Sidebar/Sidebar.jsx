import { Container, Nav, Row } from 'react-bootstrap';
import './Sidebar.scss';
import MainNavItem from '../MainNavbar/MainNavItem';

const CATEGORY = [
    {
        label: 'Quần áo nam',
        link: '/profile',
        items: [
            {
                label: 'Quần áo nam',
                link: '/profile',
                separateBottom: true,
            },
            { label: 'Quần áo nữ', link: '/profile', separateBottom: true },
            { label: 'Vest', link: '/' },
        ],
    },
    {
        label: 'Quần áo nữ',
        link: '/profile',
        items: [
            {
                label: 'Quần áo nam',
                link: '/profile',
                separateBottom: true,
            },
            { label: 'Quần áo nữ', link: '/profile', separateBottom: true },
            { label: 'Vest', link: '/' },
        ],
    },
    { label: 'Vest', link: '/' },
];

function Sidebar() {
    const handleClickNavItem = ({ sidebarItem }) => {
        alert('da cho danh mucj:', sidebarItem.label);
    };
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
