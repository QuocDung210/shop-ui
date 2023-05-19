import Tippy from '@tippyjs/react/headless';
import './Cart.scss';
import CartItem from './CartItem';
import { Stack } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox } from '@fortawesome/free-solid-svg-icons';
import Buttons from '~/components/Buttons';
import { useContext, useEffect, useState } from 'react';
import useAuth from '~/hooks/useAuth';
import { cartApi } from '~/api';
import config from '~/config';
import { splitNumber } from '~/numberSplit';
import images from '~/assets/images';
import { AppContext } from '~/Context/AppContext';
function Cart(props) {
    const [rerender, setRerender] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const auth = useAuth();
    const context = useContext(AppContext);

    useEffect(() => {
        const fetch = async () => {
            if (auth) {
                try {
                    const res = await cartApi.getCart();

                    setCartItems(res);
                } catch (err) {
                    console.log(err);
                }
            }
        };
        fetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rerender, context.render]);

    return (
        <div className="cart-container">
            <div className="d-flex align-items-center cart-wrapper gap-2">
                <div className="d-none d-md-block cart-label">
                    <span>{`GIỎ HÀNG / ${splitNumber(
                        cartItems?.length > 0 &&
                            cartItems?.reduce((total, num) => {
                                return (
                                    total +
                                    (num.product.price - (num.product.price * num.product.discount) / 100) *
                                        num.quantity
                                );
                            }, 0),
                    )} đ`}</span>
                </div>
                <Tippy
                    delay={[0, 200]}
                    trigger="click"
                    placement="bottom-end"
                    interactive
                    arrow
                    render={(attrs) => (
                        <Stack gap={3} className="cart-list content-box p-0" {...attrs}>
                            <div className="cart-list-header d-flex align-items-center gap-3 p-4 ">
                                <FontAwesomeIcon icon={faBox} />
                                <h3 className="m-0">Giỏ hàng</h3>
                            </div>
                            <div>
                                <div
                                    className={`cart-background ${cartItems?.length === 0 ? 'd-block' : 'd-none'}`}
                                    style={{ backgroundImage: `url("${images.noCart}")` }}
                                ></div>
                                <div className={`${cartItems?.length === 0 ? 'd-none' : 'd-block'}`}>
                                    <Stack gap={3} className="p-3">
                                        {cartItems?.length > 0 &&
                                            cartItems?.map((item, idx) => <CartItem item={item} key={idx} />)}
                                    </Stack>
                                    <div className="text-center p-4" style={{ borderTop: '1px solid #ccc' }}>
                                        <Buttons primary to={`/${config.routes.order}`}>
                                            {/* {`${splitNumber(
                                        currentProduct?.price -
                                            (currentProduct?.price * currentProduct?.discount) / 100,
                                    )} đ`} */}
                                            {`Thanh toán ${splitNumber(
                                                cartItems?.length > 0 &&
                                                    cartItems?.reduce((total, num) => {
                                                        return (
                                                            total +
                                                            (num.product.price -
                                                                (num.product.price * num.product.discount) / 100) *
                                                                num.quantity
                                                        );
                                                    }, 0),
                                            )} đ`}
                                        </Buttons>
                                    </div>
                                </div>
                            </div>
                        </Stack>
                    )}
                >
                    <div onClick={() => setRerender(!rerender)}>
                        <div className="d-flex align-items-center justify-content-center cart-bottom">
                            <span>{cartItems?.length || 0}</span>
                        </div>
                        <div className="cart-top"></div>
                    </div>
                </Tippy>
            </div>
        </div>
    );
}

export default Cart;
