import { Link } from 'react-router-dom';

function ResearchItem({ ind }) {
    return (
        <div className="mt-2 me-2 research-item">
            <Link to={`/:${ind}`}>option {ind}</Link>
        </div>
    );
}

export default ResearchItem;
