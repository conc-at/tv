import loadable from '@loadable/component';

export const Home = loadable(
  () =>
    import(/* webpackChunkName: "playlists", webpackPrefetch: true */ './Home'),
);
