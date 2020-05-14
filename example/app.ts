import clivia from '../src/index';
const swaggerSchema = `${__dirname}/swagger.json`;
import fetch from 'node-fetch';
const url = '';

clivia({
    port: 3009,
    swaggerSchema,
    middlewares: [
        {
            path: 'monitor',
            fn: async (req, res, next) => {
                res.statusCode = 200;
                res.end();
                next();
            }
        },
        {
            path: 'graphql',
            fn: async (req, res, next) => {
                let access_token = req.headers.access_token || req.query.access_token;
                let response = await fetch(`${url}` + access_token);
                let text = await response.text();
                if (response.ok) {
                    console.log(text);
                    next();
                } else {
                    res.statusCode = 401;
                    let r = JSON.stringify({
                        msg: "登录失效"
                    })
                    res.end(r);
                }
            }
        }
    ]
})