import { Container, Dropdown, DropdownButton } from 'react-bootstrap';
import { Legend, ResponsiveContainer, Tooltip, PieChart, Pie, Cell } from 'recharts';
import './TotalSale.scss';
import { useEffect, useState } from 'react';
import { orderApi } from '~/api';
import { toast } from 'react-toastify';
import { useDebounce } from '~/hooks';
import { randomColor } from '~/color';

function TotalSalesSeries() {
    let d = new Date();
    const [month, setMonth] = useState(d.getMonth() + 1);
    const [year, setYear] = useState(d.getFullYear());
    const [data, setData] = useState([]);
    const debounced = useDebounce(year, 1000);
    useEffect(() => {
        const fetch = async () => {
            try {
                let y;
                if (!debounced.trim()) {
                    y = d.getFullYear();
                    setYear(y);
                } else {
                    y = parseInt(debounced);
                }
                const res = await orderApi.getSeriesChart(month, y);
                setData(res);
            } catch (err) {
                console.log(err);
                toast.error('Có lỗi xảy ra.');
            }
        };
        fetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounced, month]);
    return (
        <Container fluid className="total-sale-container">
            <div className="d-flex flex-wrap justify-content-between align-items-center">
                <h2 className="ms-4 mb-0">Total Sold by Category</h2>
                <div className="d-flex gap-4">
                    <DropdownButton className="thu" id="dropdown-basic-button" title={`month ${month}`}>
                        {Array.from({ length: 12 }).map((_, idx) => (
                            <Dropdown.Item key={idx} onClick={() => setMonth(idx + 1)}>
                                {idx + 1}
                            </Dropdown.Item>
                        ))}
                    </DropdownButton>
                    <input type="number" placeholder="Year..." value={year} onChange={(e) => setYear(e.target.value)} />
                </div>
            </div>
            <hr />

            <div className={`total-pd-sale ${data.length > 0 ? 'd-block' : 'd-none'} `}>
                <p className="total-pd-sale-label">{`${data.reduce((total, value) => {
                    return total + value.value;
                }, 0)}`}</p>
            </div>
            {data.length > 0 ? (
                <ResponsiveContainer width={'100%'} height={400}>
                    <PieChart width={800} height={400}>
                        <Pie
                            data={data}
                            innerRadius={50}
                            outerRadius={100}
                            fill="#82ca9d"
                            paddingAngle={5}
                            dataKey="value"
                            label
                            nameKey={'key'}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={randomColor()} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            ) : (
                <div>
                    <p>Không có thông tin bán hàng.</p>
                </div>
            )}
        </Container>
    );
}

export default TotalSalesSeries;
