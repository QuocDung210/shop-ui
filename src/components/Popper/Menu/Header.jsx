import PropTypes from 'prop-types';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Header({ title, onClick }) {
    return (
        <header className="menu-header">
            <button className="header-btn" onClick={onClick}>
                <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <h4 className="m-0 header-title">{title}</h4>
        </header>
    );
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default Header;
