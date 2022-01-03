import { Switch, Route, Redirect } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import { MetricGrid } from './pages/MetricGrid';
import { MetricView } from './pages/MetricView';

export default function Routes() {
  return (
    <Container className="p-4">
      <Switch>
        <Route path="/metrics/:id" component={MetricView} />
        <Route path="/metrics" component={MetricGrid} />
        <Redirect to="/metrics" />
      </Switch>
    </Container>
  );
}
