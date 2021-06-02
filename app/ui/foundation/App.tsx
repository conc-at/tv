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
import { Playlists } from 'sections/playlists';
import { Home } from 'sections/home';
// import { ApolloProvider } from '@apollo/react-common';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';

// import { useQuery } from '@apollo/react-hooks';
import { Nav } from './components';
import './i18n';
import { NotFound } from './pages';
import './styles.scss';

const cache = new InMemoryCache();
const link = new HttpLink({
  // uri: 'https://tv.conc.at/graphql',
  uri: 'http://localhost:5000/graphql',
  // fetchOptions: {
  //   mode: 'no-cors',
  // },
});
const client = new ApolloClient({ cache, link });

export function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Concat TV</title>
          <link rel="canonical" href="https://tv.conc.at/" />
        </Helmet>
        <Router>
          <Nav />
          <Switch>
            <Redirect path={'/'} to={'/home'} exact></Redirect>
            <Route path={'/home'} component={Home}></Route>
            <Route path={'/playlists'} component={Playlists}></Route>
            <Route path={'/*'} component={NotFound}></Route>
          </Switch>
        </Router>
      </ApolloProvider>
    </>
  );
}
