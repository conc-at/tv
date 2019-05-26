import Koa from 'koa';
import config from 'config';
import createRouter from './routes/index.mjs';

const router = createRouter();

const app = new Koa();

app.use(router.routes());

app.listen(config.get('server.port'));

console.info(`Server started on port ${config.get('server.port')}`);
