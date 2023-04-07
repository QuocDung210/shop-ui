import Tippy from '@tippyjs/react/headless';
import './Cart.scss';
import CartItem from './CartItem';
import { Stack } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox } from '@fortawesome/free-solid-svg-icons';
import Buttons from '~/components/Buttons';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import useAuth from '~/hooks/useAuth';
import { cartApi } from '~/api';
import config from '~/config';
import { splitNumber } from '~/numberSplit';
import images from '~/assets/images';
function Cart(props) {
    const { handleShow } = props;
    const [rerender, setRerender] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const auth = useAuth();

    useEffect(() => {
        const fetch = async () => {
            if (auth) {
                try {
                    const res = await cartApi.getCart({
                        headers: { Authorization: `Bearer ${auth?.accessToken}` },
                    });

                    setCartItems(res);
                } catch (err) {
                    toast.error('Error.');
                }
            }
        };
        fetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rerender]);
    const reRenderCart = (id) => {
        setCartItems(cartItems?.filter((item) => item?.productId !== id));
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
                                            cartItems?.map((item, idx) => (
                                                <CartItem item={item} key={idx} reRenderCart={reRenderCart} />
                                            ))}
                                    </Stack>
                                    <div className="text-center p-4" style={{ borderTop: '1px solid #ccc' }}>
                                        <Buttons primary to={`/${config.routes.order}`}>
                                            {`Thanh toán ${splitNumber(
                                                cartItems?.length > 0 &&
                                                    cartItems?.reduce((total, num) => {
                                                        return total + num.product.price * num.quantity;
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
            <div className="d-block d-lg-none cart-wrapper" onClick={() => handleShow()}>
                <div className="d-flex align-items-center justify-content-center cart-bottom">
                    <span>{cartItems?.length || 0}</span>
                </div>
                <div className="cart-top"></div>
            </div>
        </div>
    );
}

export default Cart;
