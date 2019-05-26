import React from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import 'sanitize.css';
import 'sanitize.css/forms.css';
import 'sanitize.css/typography.css';

import { NotFound, Test } from './pages';
import './styles.scss';

export function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Test} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}
