import { Wrapper as PopperWrapper } from '~/components/Popper';
import './Cart.scss';
import CartItem from './CartItem';
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
                <div className="d-flex align-items-center justify-content-center cart-bottom">
                    <span>1</span>
                </div>
                <div className="cart-top"></div>
                <div className="cart-list cart-list-popper">
                    <PopperWrapper>
                        <CartItem />
                        <CartItem />
                        <CartItem />
                        <CartItem />
                        <CartItem />
                        <CartItem />
                    </PopperWrapper>
                </div>
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
