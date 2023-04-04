import { faMinus, faPlus, faRemove } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react';
import { Container, Row, Stack } from 'react-bootstrap';
import './CartItem.scss';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { cartApi } from '~/api';
import useAuth from '~/hooks/useAuth';
import images from '~/assets/images';
import { useNavigate } from 'react-router-dom';
import { splitNumber } from '~/numberSplit';
function CartItem(props) {
    const { item } = props;
    const auth = useAuth();
    const [quantity, setQuantity] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        setQuantity(item.quantity);
    }, [item]);

    const handleRemoveFromCart = async () => {
        try {
            await cartApi.deleteCart(item?.productId, {
                headers: { Authorization: `Bearer ${auth?.accessToken}` },
            });
            toast.success('Xóa thành công.');
        } catch (err) {
            toast.error(err);
        }
    };

    const handleSetQuantity = (e) => {
        if (e.target.value < 0) {
            setQuantity(0);
        } else {
            setQuantity(e.target.value);
        }
    };

    const handleSetQuantityPlus = async () => {
        try {
            let numbers = parseInt(quantity) + 1;
            await cartApi.updateCart(
                {
                    productId: item.productId,
                    quantity: numbers,
                },
                {
                    headers: { Authorization: `Bearer ${auth?.accessToken}` },
                },
            );
            setQuantity(numbers);
        } catch (err) {
            toast.error(err);
        }
    };
    const handleSetQuantityMinus = async () => {
        if (quantity > 1) {
            let numbers = parseInt(quantity) - 1;
            await cartApi.updateCart(
                {
                    productId: item.productId,
                    quantity: numbers,
                },
                {
                    headers: { Authorization: `Bearer ${auth?.accessToken}` },
                },
            );
            setQuantity(numbers);
        } else {
            return;
        }
    };
    const handleClickItem = () => {
        console.log(item.productId);
        navigate(`product/${item.productId}`);
    };
    return (
        <>
            <Container className="cart-item-container">
                <Row>
                    <Stack className="cart-item-wrapper" direction="horizontal">
                        <Stack direction="horizontal" onClick={handleClickItem}>
                            <div className="cart-item-img">
                                <img src={item?.product?.images[0] || images.errorImg} alt="hahaha" />
                            </div>
                            <Stack className=" cart-item-content">
                                <div className="cart-item-name">
                                    <p>{item?.product?.name}</p>
                                </div>
                                <div className="cart-item-price">{`${splitNumber(item?.product?.price)} đ`}</div>
                            </Stack>
                        </Stack>

                        <Tippy content={'Xóa'}>
                            <div className="cart-item-remove" onClick={handleRemoveFromCart}>
                                <FontAwesomeIcon icon={faRemove} />
                            </div>
                        </Tippy>
                        <div className="cart-set-quantity d-flex  align-items-center">
                            <FontAwesomeIcon icon={faMinus} onClick={handleSetQuantityMinus} className="cart-minus" />
                            <input
                                value={quantity}
                                type="number"
                                className="quantity-input"
                                min={0}
                                onChange={handleSetQuantity}
                                disabled
                            />
                            <FontAwesomeIcon icon={faPlus} onClick={handleSetQuantityPlus} className="cart-plus" />
                        </div>
                    </Stack>
                </Row>
            </Container>
        </>
    );
}

export default CartItem;
