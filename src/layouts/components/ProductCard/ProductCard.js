import { useRef } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import images from '~/assets/images';
import './ProductCard.scss';

function ProductCard({ product }) {
    const ref = useRef(null);

    const handleErrorImg = () => {
        ref.current.src = images.errorImg;
    };

    return (
        <>
            <Card className="card-custom">
                <div className="card-left-label">
                    <div className="card-sale-label">
                        <span>-20%</span>
                    </div>
                    <div className="card-soldout-label">
                        <span>bán hết</span>
                    </div>
                </div>
                <div className="card-right-label">
                    <div className="card-popular-label">
                        <span>Nổi bật</span>
                    </div>
                </div>
                <div className="card-img">
                    <Card.Img
                        variant="top"
                        src={product.thumbnailUrl || product.avatar}
                        onError={handleErrorImg}
                        ref={ref}
                    />
                    <div className="card-tool">
                        <Link to={`/product/${product.nickname || product.id}`}>
                            <div className="card-tool-title">
                                <p>View detail</p>
                            </div>
                        </Link>
                    </div>
                </div>
                <Card.Body>
                    <Card.Title className="card-title-custom">
                        <Link to={`/product/${product.nickname || product.id}`}>
                            <p className="card-name">{product.title || product.nickname}</p>
                        </Link>
                    </Card.Title>
                    <Card.Text>{product.likes_count || '200.000'} đồng</Card.Text>
                </Card.Body>
            </Card>
        </>
    );
}

export default ProductCard;
