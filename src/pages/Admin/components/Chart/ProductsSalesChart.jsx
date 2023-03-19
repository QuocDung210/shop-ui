import { useState } from 'react';
import { Container, Dropdown, Stack } from 'react-bootstrap';
import Chart from './Chart';
import './ProductsSalesChart.scss';

const data = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];

function ProductsSalesChart() {
    let arr = ['day', 'month', 'year'];
    const [type, setType] = useState(arr[0]);
    return (
        <Container fluid className="product-sales-chart-container">
            <Stack>
                <div className="d-flex justify-content-between ">
                    <h2 className="m-0">Products Sales</h2>

                    <Dropdown className="d-inline mx-2">
                        <Dropdown.Toggle id="dropdown-autoclose-true">{type}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {arr.map((item, idx) => (
                                <Dropdown.Item key={idx} onClick={() => setType(item)}>
                                    {item}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
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
