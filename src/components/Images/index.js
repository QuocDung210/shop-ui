import PropTypes from 'prop-types';
import { forwardRef, useState } from 'react';
import classNames from 'classnames';
import Styles from './Images.module.scss';
import images from '~/assets/images';

const Images = forwardRef(({ className, src, alt, fallback: customFallback = images.basicImg, ...props }, ref) => {
    const [fallback, setFallback] = useState('');
    const handleSetFallback = () => {
        setFallback(customFallback);
    };
    return (
        <img
            className={classNames(Styles.wrapper, className)}
            ref={ref}
            src={fallback || src}
            alt={alt}
            {...props}
            onError={handleSetFallback}
        />
    );
});

Images.propTypes = {
    className: PropTypes.string,
    src: PropTypes.string,
    alt: PropTypes.string,
    fallback: PropTypes.string,
};

export default Images;
