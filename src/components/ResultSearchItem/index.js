import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import Styles from './ResultSearchItem.module.scss';
import Images from '../Images';
import { splitNumber } from '~/numberSplit';
const cx = classNames.bind(Styles);

function ResultSearchItem({ searchResult }) {
    return (
        <Link to={`/product/${searchResult?.id}`} className={cx('wrapper')}>
            <Images className={cx('product__img')} src={searchResult.images[0]} alt="avatar" />
            <div className={cx('info')}>
                <p className={cx('product__name')}>{searchResult.name}</p>
                <p className={cx('product__price')}>{`${splitNumber(searchResult.price)} đ`}</p>
            </div>
        </Link>
    );
}

ResultSearchItem.prototype = {
    searchResult: PropTypes.object.isRequired,
};

export default ResultSearchItem;
