import { Link } from 'react-router-dom';

import Button from 'components/Button';
import Card from 'components/Card';

const NotFound = () => {
  return (
    <Card className="not-found">
      <h1>Oops! :-(</h1>
      <h3 className="text-muted">404 - Page Not Found!</h3>
      <Link to="/">
        <Button primary>
          Back to Home
        </Button>
      </Link>
    </Card>
  )
}

export default NotFound;