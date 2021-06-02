import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { Helmet } from 'react-helmet';
import 'sanitize.css';
import 'sanitize.css/forms.css';
import 'sanitize.css/typography.css';
import 'react-virtualized/styles.css';

import { Nav } from './components';
import './styles.scss';
import './i18n';
import { Playlists } from 'sections/playlists';
import { NotFound, Test } from './pages';
import { Home } from 'sections/home';

export function App() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Concat TV</title>
        <link rel="canonical" href="https://tv.conc.at/" />
      </Helmet>
      <Router>
        <Nav />

        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/playlists">
            <Playlists />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </>
  );
}
