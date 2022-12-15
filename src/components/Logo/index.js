import { Link } from 'react-router-dom';
import config from '~/config';
import './Logo.scss';

function Logo() {
    return (
        <Link to={config.routes.home}>
            <div className="logo">
                <h1 className="boujee-text">MyStore</h1>
            </div>
        </Link>
    );
}

export default Logo;
