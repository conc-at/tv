import loadable from '@loadable/component';

export const Playlists = loadable(
  () =>
    import(
      /* webpackChunkName: "playlists", webpackPrefetch: true */ './Playlists'
    ),
);
