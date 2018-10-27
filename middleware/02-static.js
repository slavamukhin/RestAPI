// Usually served by Nginx
const serve = require('koa-static');

// $ GET /hello.txt
exports.init = app => app.use(serve('public'));