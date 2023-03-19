import { Container, Nav, Stack } from 'react-bootstrap';
import { ResponsiveContainer } from 'recharts';

function ChartContainer({ children }) {
    return (
        <Container fluid className="total-sale-container">
            <h2>Total Sales</h2>
            <ResponsiveContainer width={'100%'} height={400}>
                {children}
            </ResponsiveContainer>
        </Container>
    );
}

export default ChartContainer;
