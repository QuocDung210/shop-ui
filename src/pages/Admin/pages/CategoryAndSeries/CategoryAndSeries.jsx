import './CategoryAndSeries.scss';

import { ToastContainer } from 'react-toastify';

import Category from './Category';
import Series from './Series';
import { Container } from 'react-bootstrap';

function CategoryAndSeries() {
    return (
        <>
            <Container fluid className="category-series-manage-container">
                <Category />

                <Series />
            </Container>
            <ToastContainer />
        </>
    );
}

export default CategoryAndSeries;
