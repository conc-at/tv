import React from 'react';
import {
  Switch,
  Route,
  BrowserRouter as Router,
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
import { Link } from 'components/link';


const NotFound = () => (
  <div>
    <h1>404 - Not Found!</h1>
    <Link to="/">
      Go Home
    </Link>
  </div>
);

const Home = () => (
  <div>
    <h1>Home</h1>
  </div>
);

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
          <Route path="/playlists" component={Playlists}></Route>
          <Route path={["/home", "/"]} component={Home}></Route>
          <Route path="*" component={NotFound}></Route>
        </Switch>
      </Router>
    </>
  );
}
