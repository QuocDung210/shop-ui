import { useEffect, useState } from 'react';
import { Container, Stack } from 'react-bootstrap';
import Chart from './Chart';
import './ProductsSalesChart.scss';
import { orderApi } from '~/api';
import { toast } from 'react-toastify';
import { useDebounce } from '~/hooks';

function ProductsSalesChart() {
    let d = new Date();

    const [type, setType] = useState(d.getFullYear());
    const [data, setData] = useState([]);
    const debounced = useDebounce(type, 1000);
    useEffect(() => {
        const fetchApi = async () => {
            try {
                let y;
                if (!debounced.trim()) {
                    y = d.getFullYear();
                    setType(y);
                } else {
                    y = parseInt(debounced);
                }
                const resColumn = await orderApi.getSoldYear(y);

                setData(resColumn);
            } catch (err) {
                console.log(err);
                toast.error('Có lỗi xảy ra.');
            }
        };
        fetchApi();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounced]);

    return (
        <Container fluid className="product-sales-chart-container">
            <Stack>
                <div className="d-flex justify-content-between align-items-center">
                    <h2 className="m-0">Products sold</h2>

                    <input type="number" placeholder="Year..." value={type} onChange={(e) => setType(e.target.value)} />
                </div>
                <hr />
                <div>
                    <Chart dt={data} />
                </div>
            </Stack>
        </Container>
    );
}

export default ProductsSalesChart;
