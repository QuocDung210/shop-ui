import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Stack } from 'react-bootstrap';
import { CircularProgressbar } from 'react-circular-progressbar';
import './TotalRevenue.scss';

function TotalRevenue() {
    const curr = 200;
    return (
        <Container className="revenue-container">
            <Stack>
                <div className="revenue-header">
                    <h2 className="m-0">Total Revenue</h2>
                    <span>Detail</span>
                </div>
                <hr />
                <div className="revenue-progressbar">
                    <CircularProgressbar value={70} text={'70%'} />
                </div>
                <p>Total sales made today</p>
                <p>100.000 VND</p>
                <div>
                    <span>Target: </span>
                    {curr > 100 ? (
                        <span>
                            <FontAwesomeIcon icon={faArrowUp} style={{ color: 'greenyellow' }} />
                        </span>
                    ) : (
                        <span>
                            <FontAwesomeIcon icon={faArrowDown} style={{ color: 'red' }} />
                        </span>
                    )}
                </div>
            </Stack>
        </Container>
    );
}

export default TotalRevenue;
