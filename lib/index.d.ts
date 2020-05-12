import { RequestHandler } from 'express';
export interface cliviaOptions {
    port: number;
    swaggerSchema: string;
    guardMidware?: RequestHandler;
}
declare function clivia(options: cliviaOptions): void;
export default clivia;
