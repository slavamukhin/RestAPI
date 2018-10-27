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
const Users = require('./mongoose/Schemas/User');
const mongoose = require('./mongoose/mongoose');

const middleware = fs.readdirSync(path.join(__dirname, 'middleware')).sort();
middleware.forEach(middleware => require('./middleware/' + middleware).init(app));

// can be split into files too
const Router = require('koa-router');

const router = new Router();

// router.get('/views', async (ctx, next) => {
//     let count = ctx.session.count || 0;
//     ctx.session.count = ++count;
//
//     ctx.body = ctx.render('./templates/index.pug', {
//      user: 'John',
//      count
//     });
// });
//
// router.get('/user/:user/hello', async (ctx, next) => {
//     if (ctx.params.user === 'admin') {
//         await next();
//         return;
//     }
//
//     ctx.throw(403);
//     },
//     async (ctx, next) => {
//         ctx.body = 'Hello ' + ctx.params.user;
//     }
// );
//
// router.get('/', async (ctx) => {
//    ctx.redirect('/views');
//    ctx.body = '1';
// });

router.get('/users/:id', async (ctx, next) => {
    const userId = ctx.params.id;
    if (mongoose.Types.ObjectId.isValid(userId)) {
        ctx.findUserId = userId;
        await next();
        return;
    }
    ctx.throw(422, 'UserId not correct');
}, async (ctx, next) => {
    const person = await Users.find({
        _id: ctx.findUserId
    });
    if (person.length) {
        ctx.body = person;
        return;
    }
    ctx.throw(404, 'User not found');
});

router.get('/users', async (ctx, next) => {
    const users = await Users.find({});
    ctx.body = users;
});

router.post('/users', async (ctx, next) => {
    ctx.body = 'POST /users';
    console.log('LOG', ctx.request.body);
});

router.patch('/users/:id', async (ctx, next) => {
   ctx.body = 'PATCH /users/:id';
   console.log('LOG PATCH', ctx.request.body);
});

router.delete('/users/:id', async (ctx, next) => {
    ctx.body = 'DELETE /users/:id';
    console.log('LOG DELETE', ctx.params.id);
});

app.use(router.routes());
app.listen(config['port']);
