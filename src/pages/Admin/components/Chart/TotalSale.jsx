import { Container } from 'react-bootstrap';
import { Legend, ResponsiveContainer, Tooltip, PieChart, Pie, Cell, Label } from 'recharts';
import './TotalSale.scss';

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

const CustomerLable = (props) => {
    const { cx, cy } = props.viewBox;
    let sum = data.reduce((total, value, index, arr) => {
        return total + value.pv;
    }, 0);
    return (
        <g>
            <text x={cx} y={cy - 20} dy={8} textAnchor="middle">
                Total
            </text>
            <text x={cx} y={cy + 12} dy={8} textAnchor="middle" fontSize={30}>
                {sum}
            </text>
        </g>
    );
};
function TotalSale(props) {
    return (
        <Container fluid className="total-sale-container">
            <h2 className="ms-4">Total Product Sold</h2>
            <hr />
            <ResponsiveContainer width={'100%'} height={400}>
                <PieChart width={800} height={400}>
                    <Pie data={data} innerRadius={80} outerRadius={100} fill="#8884d8" paddingAngle={5} dataKey="pv">
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                        <Label position="center" content={CustomerLable} />
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </Container>
    );
}

export default TotalSale;
