import { Container, Row, Stack } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import Logo from '~/components/Logo';
import './AdminSidebar.scss';
import { useEffect, useState } from 'react';
import useAuth from '~/hooks/useAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruckFast } from '@fortawesome/free-solid-svg-icons';
function AdminSidebar(props) {
    const location = useLocation();
    const pathNames = location.pathname.split('/').filter((x) => x);
    const { sbItems, handleCloseOffCanvas } = props;
    const [selected, setSelected] = useState(sbItems[0].title);
    const navigate = useNavigate();
    const auth = useAuth();

    const handleCheckSbItems = () => {
        let newSbItem;
        if (auth?.user?.role === 'admin') {
            newSbItem = [...sbItems];
        } else {
            newSbItem = [
                sbItems[4],
                {
                    icon: <FontAwesomeIcon icon={faTruckFast} />,
                    title: 'Giao hàng',
                    link: 'employee',
                },
            ];
        }
        return newSbItem;
    };

    useEffect(() => {
        setSelected(pathNames[1]);
    }, [pathNames]);

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
                <div>
                    <Logo.NotLink />
                </div>
            </Row>
            <Row className="pb-3 admin-sidebar-menu">
                <Stack gap={2}>
                    {handleCheckSbItems().map((item, idx) => (
                        <div
                            key={idx}
                            className={`menu-item ${selected === item?.link && 'menu-item-selected'} ${
                                auth.user.role === 'employee' &&
                                (item?.title === 'Tài khoản' || item?.title === 'Bảng điều khiển') &&
                                'd-none'
                            }`}
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
