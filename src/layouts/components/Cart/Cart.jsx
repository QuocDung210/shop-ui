import Tippy from '@tippyjs/react/headless';
import './Cart.scss';
import CartItem from './CartItem';
import { Stack } from 'react-bootstrap';
function Cart() {
    const handleShowCart = () => {
        alert('Gio hang trong');
    };
    return (
        <div className="cart-container">
            <div className="d-none d-lg-flex align-items-center cart-wrapper gap-2">
                <div className="d-none d-md-block cart-label">
                    <span>GIỎ HÀNG / 0 đ</span>
                </div>
                <Tippy
                    delay={[0, 200]}
                    trigger="click"
                    placement="bottom-end"
                    interactive
                    arrow
                    render={(attrs) => (
                        <Stack gap={3} className="content-box " {...attrs}>
                            <CartItem />
                            <CartItem />
                            <CartItem />
                            <CartItem />
                            <CartItem />
                            <CartItem />
                        </Stack>
                    )}
                >
                    <div>
                        <div className="d-flex align-items-center justify-content-center cart-bottom">
                            <span>1</span>
                        </div>
                        <div className="cart-top"></div>
                    </div>
                </Tippy>
            </div>
            <div className="d-block d-lg-none cart-wrapper" onClick={handleShowCart}>
                <div className="d-flex align-items-center justify-content-center cart-bottom">
                    <span>1</span>
                </div>
                <div className="cart-top"></div>
            </div>
        </div>
    );
}

export default Cart;
