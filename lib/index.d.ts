import { RequestHandler } from 'express';
export interface cliviaMiddleware {
    path: string;
    fn: RequestHandler;
}
export interface cliviaOptions {
    port: number;
    swaggerSchema: string;
    middlewares?: cliviaMiddleware[];
}
declare function clivia(options: cliviaOptions): void;
export default clivia;
