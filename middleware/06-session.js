// in-memory store by default (use the right module instead)
const session = require('koa-generic-session');
const convert = require('koa-convert');

// sdafsdl1fseorp8eofklsel3sef98, sid (06Session id)

/*
const sessions = {
    sdafsdl1fseorp8eofklsel3sef98: {name: 'Ivan', visitsCount: 1}
};

if (ctx.cookie && sessions[ctx.cookie.sid])
    ctx.06Session = 06Session[ctx.cookie.sid]
 */

exports.init = app => app.use(convert(session({
    cookie: {
        signed: false,
    }
})));