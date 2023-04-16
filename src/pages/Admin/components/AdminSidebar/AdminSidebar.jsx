import { Container, Row, Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Logo from '~/components/Logo';
import './AdminSidebar.scss';
import { useState } from 'react';
function AdminSidebar(props) {
    const { sbItems, handleCloseOffCanvas } = props;
    const [selected, setSelected] = useState(sbItems[0].title);
    const navigate = useNavigate();

    const handleClickItem = (item) => {
        if (typeof handleCloseOffCanvas === 'function') {
            handleCloseOffCanvas();
        }
        setSelected(item?.title);
        navigate(item?.link);
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
                        <div
                            key={idx}
                            className={`menu-item ${selected === item?.title && 'menu-item-selected'}`}
                            onClick={() => handleClickItem(item)}
                        >
                            {item?.icon}
                            <p className="mb-0 ps-4">{item?.title}</p>
                        </div>
                    ))}
                </Stack>
            </Row>
        </Container>
    );
}

export default AdminSidebar;
