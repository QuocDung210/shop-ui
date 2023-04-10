import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Legend, ResponsiveContainer } from 'recharts';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

import './YearlySales.scss';
import { useDebounce } from '~/hooks';
import { orderApi } from '~/api';
import { toast } from 'react-toastify';

function YearlySales(props) {
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
                const resColumn = await orderApi.getIncomeYear(y);

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
        <Container fluid className="yearly-sales-container">
            <div className="d-flex justify-content-between ">
                <h2 className="ms-4">Yearly Sales</h2>
                <input type="number" placeholder="Year..." value={type} onChange={(e) => setType(e.target.value)} />
            </div>
            <hr />
            <div className="w-100 d-flex justify-content-center">
                <ResponsiveContainer width={'80%'} height={400}>
                    <AreaChart
                        width={500}
                        height={400}
                        data={data}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="key" />
                        <YAxis />
                        <Legend />
                        <Tooltip />
                        <Area type="monotone" dataKey="value" stackId="1" stroke="#8884d8" fill="#8884d8" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </Container>
    );
}

export default YearlySales;
