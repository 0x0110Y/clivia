"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var express_graphql_1 = __importDefault(require("express-graphql"));
var node_fetch_1 = require("./node-fetch");
var swagger_to_graphql_1 = require("swagger-to-graphql");
var app = express_1.default();
function clivia(options) {
    var swaggerSchema = options.swaggerSchema, port = options.port, guardMidware = options.guardMidware;
    swagger_to_graphql_1.createSchema({
        swaggerSchema: swaggerSchema,
        callBackend: node_fetch_1.callBackend
    })
        .then(function (schema) {
        guardMidware && app.use('/graphql', guardMidware);
        app.use('/graphql', express_graphql_1.default(function () {
            return {
                schema: schema,
                graphiql: true,
            };
        }));
        app.listen(port, 'localhost', function () {
            console.info("http://localhost:" + options.port + "/graphql");
        });
    })
        .catch(function (e) {
        console.log(e);
    });
}
exports.default = clivia;
