import images from '~/assets/images';
import classNames from 'classnames/bind';
import Style from './Logo.module.scss';
import { Link } from 'react-router-dom';
import config from '~/config';

const cx = classNames.bind(Style);

function Logo() {
    return (
        <Link to={config.routes.home}>
            <div className={cx('logo')}>
                <img src={images.logo} alt="logo" />
            </div>
        </Link>
    );
}

export default Logo;
