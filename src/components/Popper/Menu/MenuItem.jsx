import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Buttons from '~/components/Buttons';

function MenuItem({ item, onClick }) {
    const classes = classNames('menu__item', {
        separate__top: item.separateTop,
        separate__bottom: item.separateBottom,
    });
    return (
        <Buttons className={classes} to={item.link} leftIcon={item.icon} onClick={onClick}>
            {item.label}
        </Buttons>
    );
}

MenuItem.propTypes = {
    item: PropTypes.object.isRequired,
    onClick: PropTypes.func,
};

export default MenuItem;
