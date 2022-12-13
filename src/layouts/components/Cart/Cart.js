import { Wrapper as PopperWrapper } from '~/components/Popper';
import './Cart.scss';
import CartItem from './CartItem';
function Cart() {
    return (
        <div className="cart-container">
            <div className="cart-wrapper d-none d-lg-block">
                <div className="d-flex align-items-center justify-content-center cart-bottom">
                    <span>0</span>
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
            <div className="cart-wrapper d-block d-lg-none">
                <div className="d-flex align-items-center justify-content-center cart-bottom">
                    <span>0</span>
                </div>
                <div className="cart-top"></div>
            </div>
        </div>
    );
}

export default Cart;
