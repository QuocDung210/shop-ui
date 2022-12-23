import { Placeholder } from 'react-bootstrap';
import './CartMini.scss';

function CartMini() {
    return <>Card Mini</>;
}

const Loading = () => {
    return (
        <>
            <div className="d-flex align-items-center">
                <Placeholder />
            </div>
        </>
    );
};

CartMini.Loading = Loading;

export default CartMini;
