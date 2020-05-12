import clivia from '../src/index';
const swaggerSchema = `${__dirname}/swagger.json`;
import fetch from 'node-fetch';
const url = '';

clivia({
    port: 3009,
    swaggerSchema,
    guardMidware: async (req, res, next) => {
        let access_token = req.headers.access_token || req.query.access_token;
        let response = await fetch(`${url}` + access_token);
        let text = await response.text();
        if (response.ok) {
            next();
        } else {
            res.statusCode = 401;
            let r = JSON.stringify({
                msg: "登录失效"
            })
            res.end(r);
        }


    }
})