import { faClockRotateLeft, faExclamation, faTag, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Stack } from 'react-bootstrap';
import './Widget.scss';
import { useNavigate } from 'react-router-dom';
function Widget(props) {
    const { type, dt = 0, link } = props;
    let data;
    const navigate = useNavigate();
    switch (type) {
        case 'users':
            data = {
                icon: <FontAwesomeIcon icon={faUser} />,
                couter: 100,
                title: 'Users',
                color: 'green',
            };
            break;
        case 'products':
            data = {
                icon: <FontAwesomeIcon icon={faTag} />,
                couter: 100,
                title: 'Products',
                color: 'blue',
            };
            break;
        case 'orders':
            data = {
                icon: <FontAwesomeIcon icon={faClockRotateLeft} />,
                couter: 100,
                title: 'Orders',
                color: 'orange',
            };
            break;
        case 'soleout':
            data = {
                icon: <FontAwesomeIcon icon={faExclamation} />,
                couter: 100,
                title: 'Sole out',
                color: 'red',
            };
            break;
        default:
            break;
    }

    return (
        <Container className="p-0">
            <Stack className="info-wrapper align-items-center">
                <div className="info-icon" style={{ backgroundColor: data.color }} onClick={() => navigate(link)}>
                    {data?.icon}
                </div>
                <span>{dt}</span>
                <p>{data?.title}</p>
            </Stack>
        </Container>
    );
}

export default Widget;
