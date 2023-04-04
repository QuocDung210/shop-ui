import { useRef } from 'react';
import { Card, Placeholder } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import images from '~/assets/images';
import './ProductCard.scss';
import { splitNumber } from '~/numberSplit';

function ProductCard({ product }) {
    const ref = useRef(null);

    const handleErrorImg = () => {
        ref.current.src = images.errorImg;
    };

    return (
        <>
            <Card className="card-custom">
                <div className="card-left-label">
                    <div className={`card-sale-label ${product?.discount === 0 && 'd-none'}`}>
                        <span>{product?.discount}%</span>
                    </div>
                    <div className={`card-soldout-label ${product?.available !== 0 && 'd-none'}`}>
                        <span>Bán hết</span>
                    </div>
                </div>
                {/* <div className="card-right-label">
                    <div className="card-popular-label">
                        <span>Nổi bật</span>
                    </div>
                </div> */}
                <div className="card-img">
                    <Card.Img
                        variant="top"
                        src={product?.avatar || product?.images[0]}
                        onError={handleErrorImg}
                        ref={ref}
                    />
                    <div className="card-tool">
                        <Link to={`/product/${product?.nickname || product?.id}`}>
                            <div className="card-tool-title">
                                <p>View detail</p>
                            </div>
                        </Link>
                    </div>
                </div>
                <Card.Body>
                    <Card.Title className="card-title-custom">
                        <Link to={`/product/${product?.nickname || product?.id}`}>
                            <p className="card-name">{product?.name || product?.nickname}</p>
                        </Link>
                    </Card.Title>
                    <Card.Text>{`${splitNumber(product?.price)} đ`}</Card.Text>
                </Card.Body>
            </Card>
        </>
    );
}

const Loading = () => {
    return (
        <>
            <Card>
                <Placeholder animation="glow">
                    <Placeholder style={{ width: '100%', height: '190px' }} />
                </Placeholder>
                <Card.Body>
                    <Placeholder as={Card.Title} animation="glow">
                        <Placeholder xs={12} /> <Placeholder xs={6} />
                    </Placeholder>
                    <Placeholder as={Card.Text} animation="glow">
                        <Placeholder xs={12} />
                    </Placeholder>
                </Card.Body>
            </Card>
        </>
    );
};

ProductCard.Loading = Loading;

export default ProductCard;
