import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import 'sanitize.css';
import 'sanitize.css/forms.css';
import 'sanitize.css/typography.css';
import 'react-virtualized/styles.css';
import { Playlists } from 'sections/playlists';
import { Home } from 'sections/home';

import { Nav } from './components';
import './i18n';
import { NotFound } from './pages';
import './styles.scss';

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
          <Redirect from={'/'} to={'/home'}></Redirect>
          <Route path={'/home'} component={Home}></Route>
          <Route path={'/playlists'} component={Playlists}></Route>
          <Route path={'*'} component={NotFound}></Route>
        </Switch>
      </Router>
    </>
  );
}
