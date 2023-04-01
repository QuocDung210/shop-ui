import { Container, Stack } from 'react-bootstrap';

function MainCar() {
    return (
        <Container fluid>
            <Stack>
                <div>
                    <h2>Giỏ hàng</h2>
                </div>
                <hr />
                <div className="maincart-list-item">
                    <hr />
                </div>
            </Stack>
        </Container>
    );
}

export default MainCar;
