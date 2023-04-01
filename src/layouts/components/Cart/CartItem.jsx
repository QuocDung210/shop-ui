import { faRemove } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react';
import { Container, Stack } from 'react-bootstrap';
import images from '~/assets/images';
import './CartItem.scss';
function CartItem({ item = {} }) {
    const handleRemoveFromCart = () => {
        console.log('removed');
    };
    return (
        <>
            <Container className="cart-item">
                <Stack direction="horizontal">
                    <div className="cart-item-img">
                        <img src={images.basicImg} alt="hahaha" />
                    </div>
                    <Stack className=" cart-item-content">
                        <div className="cart-item-name">
                            <strong>name</strong>
                        </div>
                        <div className="cart-item-price">500000 dong</div>
                    </Stack>
                    <Tippy content={'Xóa'}>
                        <div className="cart-item-remove" onClick={handleRemoveFromCart}>
                            <FontAwesomeIcon icon={faRemove} />
                        </div>
                    </Tippy>
                </Stack>
            </Container>
        </>
    );
}

export default CartItem;
