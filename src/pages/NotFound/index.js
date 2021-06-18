import { Link } from 'react-router-dom';
import Button from 'components/Button';
import Card from 'components/Card';

const NotFound = () => {
  return (
    <Card className="not-found">
      <div>
        <h1>Oops!</h1>
        <h1>404</h1>
        <h6>Page Not Found!</h6>
        <Button primary>
          <Link to="/gallery">Back to Home</Link>
        </Button>
      </div>
    </Card>
  )
}

export default NotFound;