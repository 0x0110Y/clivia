import express from 'express';
import graphqlHTTP from 'express-graphql';
import { callBackend } from './node-fetch';
import { createSchema } from 'swagger-to-graphql';
import { RequestHandler } from 'express';


const app = express();


export interface cliviaOptions {
    port: number,
    swaggerSchema: string,
    guardMidware?: RequestHandler
}

function clivia(options: cliviaOptions) {
    let { swaggerSchema, port, guardMidware } = options;
    createSchema({
        swaggerSchema,
        callBackend
    })
        .then(schema => {

            guardMidware && app.use(
                '/graphql',
                guardMidware
            );

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
                console.info(`http://localhost:${options.port}/graphql`);
            });
        })
        .catch(e => {
            console.log(e);
        });
}

export default clivia;
