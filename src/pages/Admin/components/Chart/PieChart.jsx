import Tippy from '@tippyjs/react';
import { Container, ProgressBar, Stack } from 'react-bootstrap';
import './PieChart.scss';

const data = [
    {
        name: 'Asus',
        uv: 31.47,
        pv: 2400,
        fill: '#8884d8',
    },
    {
        name: 'Macbook',
        uv: 26.69,
        pv: 4567,
        fill: '#83a6ed',
    },
    {
        name: 'HP',
        uv: 15.69,
        pv: 1398,
        fill: '#8dd1e1',
    },
    {
        name: 'Dell',
        uv: 8.22,
        pv: 9800,
        fill: '#82ca9d',
    },
    {
        name: 'MSI',
        uv: 8.63,
        pv: 3908,
        fill: '#a4de6c',
    },
    {
        name: 'Lenovo',
        uv: 2.63,
        pv: 4800,
        fill: '#d0ed57',
    },
    {
        name: 'Acer',
        uv: 6.67,
        pv: 4800,
        fill: '#ffc658',
    },
];

function PieChart() {
    let sum = data.reduce((total, value, index, arr) => {
        return total + value.pv;
    }, 0);
    return (
        <Container fluid className="pie-chart-container">
            <h2 className="ms-4 mb-4">Total products sold by model</h2>
            <hr />
            <Stack gap={4}>
                <div className={'d-flex align-items-center mx-4'}>
                    <h4 className="m-0" style={{ minWidth: '90px' }}>
                        Total
                    </h4>
                    <Tippy content={<p className="m-0">{`Total : ${sum}`}</p>}>
                        <ProgressBar className="flex-fill" now={100} />
                    </Tippy>
                </div>
                {data.map((item, idx) => (
                    <div key={idx} className={'d-flex align-items-center mx-4'}>
                        <h4 className="m-0" style={{ minWidth: '90px' }}>
                            {item.name}
                        </h4>
                        <Tippy
                            content={
                                <p className="m-0">{`${item.name} : ${item.pv} (${((item.pv * 100) / sum).toFixed(
                                    2,
                                )}%)`}</p>
                            }
                        >
                            <ProgressBar className="flex-fill" now={(item.pv * 100) / sum} />
                        </Tippy>
                    </div>
                ))}
            </Stack>
        </Container>
    );
}

export default PieChart;
