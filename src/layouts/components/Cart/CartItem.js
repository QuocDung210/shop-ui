import { faRemove } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react';
import { Container } from 'react-bootstrap';
import images from '~/assets/images';

function CartItem({ item = {} }) {
    const handleRemoveFromCart = () => {
        console.log('removed');
    };
    return (
        <>
            <Container className="cart-item">
                <div className="d-flex flex-row align-items-center">
                    <div className="cart-item-img">
                        <img src={images.basicImg} alt="hahaha" />
                    </div>
                    <div className="flex-fill d-flex flex-column cart-item-content">
                        <div className="cart-item-name">
                            <strong>name</strong>
                        </div>
                        <div className="cart-item-price">500000 dong</div>
                    </div>
                    <Tippy content={'Xóa'}>
                        <div className="cart-item-remove" onClick={handleRemoveFromCart}>
                            <FontAwesomeIcon icon={faRemove} />
                        </div>
                    </Tippy>
                </div>
            </Container>
        </>
    );
}

export default CartItem;
