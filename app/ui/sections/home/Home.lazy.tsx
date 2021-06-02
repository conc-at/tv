import loadable from '@loadable/component';

export const Home = loadable(() =>
  import(/* webpackChunkName: "home", webpackPrefetch: true */ './Home'),
);
