import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container } from 'react-bootstrap';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { useNavigate } from 'react-router-dom';
import './Breadcrumb.scss';
import { useLocation } from 'react-router-dom';

function BreadcrumbMap() {
    const location = useLocation();
    const navigation = useNavigate();
    const pathNames = location.pathname.split('/').filter((x) => x);
    return (
        <Container fluid>
            <Container className="d-flex align-items-center breadcrumb-container">
                <Breadcrumb>
                    <Breadcrumb.Item as={'div'}>
                        {pathNames.length > 0 ? (
                            <div
                                className="d-flex align-items-center gap-2"
                                style={{ color: 'black' }}
                                onClick={() => navigation('/')}
                            >
                                <FontAwesomeIcon style={{ fontSize: '1.3rem' }} icon={faHome} />
                                <span>Home</span>
                            </div>
                        ) : (
                            <span>Home</span>
                        )}
                    </Breadcrumb.Item>
                    {pathNames.map((name, index) => {
                        const routeTo = `/${pathNames.slice(0, index + 1).join('/')}`;
                        const isLast = index === pathNames.length - 1;
                        return isLast ? (
                            <Breadcrumb.Item as={'div'} key={name}>
                                <span>{name}</span>
                            </Breadcrumb.Item>
                        ) : (
                            <Breadcrumb.Item as={'div'} key={name}>
                                <div onClick={() => navigation(routeTo)}>
                                    <span style={{ color: 'black' }}>{name}</span>
                                </div>
                            </Breadcrumb.Item>
                        );
                    })}
                </Breadcrumb>
            </Container>
        </Container>
    );
}

export default BreadcrumbMap;
