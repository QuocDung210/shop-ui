import PropTypes from 'prop-types';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import Styles from './ResultSearchItem.module.scss';
import Images from '../Images';
const cx = classNames.bind(Styles);

function ResultSearchItem({ searchResult }) {
    return (
        <Link to={`/product/${searchResult.nickname}`} className={cx('wrapper')}>
            <Images className={cx('avatar')} src={searchResult.avatar} alt="avatar" />
            <div className={cx('info')}>
                <p className={cx('music__name')}>
                    <span className={cx('name')}>{searchResult.full_name}</span>
                    {searchResult.tick && <FontAwesomeIcon icon={faCheckCircle} className={cx('check')} />}
                </p>
                <p className={cx('singer__name')}>{searchResult.nickname}</p>
            </div>
        </Link>
    );
}

ResultSearchItem.prototype = {
    searchResult: PropTypes.object.isRequired,
};

export default ResultSearchItem;
