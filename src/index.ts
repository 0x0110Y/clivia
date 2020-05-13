import express from 'express';
import graphqlHTTP from 'express-graphql';
import { callBackend } from './node-fetch';
import { createSchema } from 'swagger-to-graphql';
import { RequestHandler } from 'express';


const app = express();


export interface cliviaOptions {
    port: number,
    swaggerSchema: string,
    middlewares: [{
        path: string,
        fn: RequestHandler
    }]
}

function clivia(options: cliviaOptions) {
    let { swaggerSchema, port, middlewares } = options;
    createSchema({
        swaggerSchema,
        callBackend
    })
        .then(schema => {
            middlewares.forEach(({ path, fn }) => {
                app.use(path, fn);
            });

            app.use(
                '/graphql',
                graphqlHTTP(() => {
                    return {
                        schema,
                        graphiql: true,
                    };
                }),
            );

            app.listen(port, 'localhost', () => {
                console.info(`http://localhost:${port}/graphql`);
            });
        })
        .catch(e => {
            console.log(e);
        });
}

export default clivia;
