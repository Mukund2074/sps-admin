import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';

export default function UnderDevelopment() {
    return (
        <div>
            <Container>
               <h1>PAGE NOT FOUND</h1>
               <h1>Go Back Home</h1>
               <h1>Worng Url Request</h1>

                
            </Container>
            <br /><br/>
            <Link to="/Dashboard" className="btn btn-primary btn-user">&larr; Back to Dashboard</Link>
        </div>

    );
}