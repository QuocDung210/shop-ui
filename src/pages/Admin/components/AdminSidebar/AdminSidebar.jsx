import { Container, Row, Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Logo from '~/components/Logo';
import './AdminSidebar.scss';
function AdminSidebar(props) {
    const { sbItems, handleCloseOffCanvas } = props;
    const navigate = useNavigate();

    const handleClickItem = (link) => {
        if (typeof handleCloseOffCanvas === 'function') {
            handleCloseOffCanvas();
        }
        navigate(link);
    };
    return (
        <Container fluid className="m-0 admin-sidebar-container">
            <Row className="p-3 admin-info">
                <div onClick={() => handleClickItem('dashboard')}>
                    <Logo.NotLink />
                </div>
            </Row>
            <Row className="pb-3 admin-sidebar-menu">
                <Stack gap={2}>
                    {sbItems.map((item, idx) => (
                        <div key={idx} className="menu-item" onClick={() => handleClickItem(item.link)}>
                            {item.icon}
                            <p className="mb-0 ps-4">{item.title}</p>
                        </div>
                    ))}
                </Stack>
            </Row>
        </Container>
    );
}

export default AdminSidebar;
