import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';

import Styles from './Menu.module.scss';
const cx = classNames.bind(Styles);
function MenuItem({ title, icon, activeIcon, to }) {
    return (
        <NavLink className={(nav) => cx('item__link', { active: nav.isActive })} to={to}>
            <div className={cx('nav__item')}>
                <span className={cx('item__icon')}>{icon}</span>
                <span className={cx('item__activeIcon')}>{activeIcon}</span>
                <p className={cx('title')}>{title}</p>
            </div>
        </NavLink>
    );
}

MenuItem.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
    to: PropTypes.string,
};

export default MenuItem;
