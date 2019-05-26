import Router from 'koa-router';
import * as services from './services.mjs';
import * as playlist from './playlist.mjs';

export default function createRouter() {
  const router = new Router();

  router.get('/services/ping', services.ping);
  router.get('/playlist', playlist.index);

  return router;
}
