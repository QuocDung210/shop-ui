import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Chart({ dt }) {
    return (
        <>
            <ResponsiveContainer width={'100%'} height={400}>
                <BarChart
                    width={500}
                    height={300}
                    data={dt}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="pv" fill="#8884d8" />
                    <Bar dataKey="uv" fill="#82ca9d" />
                    <Bar dataKey="uv" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>
        </>
    );
}

export default Chart;
