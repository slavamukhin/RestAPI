// A "closer to real-life" app example
// using 3rd party middleware modules
// P.S. MWs calls be refactored in many files

// long stack trace (+clarify from co) if needed
if (process.env.TRACE) {
    require('./libs/trace');
}

const Koa = require('koa');
const app = new Koa();

const config = require('./config/default');

const path = require('path');
const fs = require('fs');

const middleware = fs.readdirSync(path.join(__dirname, 'middleware')).sort();
middleware.forEach(middleware => require('./middleware/' + middleware).init(app));

// can be split into files too
const Router = require('koa-router');

const router = new Router();

router.get('/views', async (ctx, next) => {
    let count = ctx.session.count || 0;
    ctx.session.count = ++count;

    ctx.body = ctx.render('./templates/index.pug', {
     user: 'John',
     count
    });
});

router.get('/user/:user/hello', async (ctx, next) => {
    if (ctx.params.user === 'admin') {
        await next();
        return;
    }

    ctx.throw(403);
    },
    async (ctx, next) => {
        ctx.body = 'Hello ' + ctx.params.user;
    }
);

router.get('/', async (ctx) => {
   ctx.redirect('/views');
   ctx.body = '1';
});

app.use(router.routes());
app.listen(config['port']);
