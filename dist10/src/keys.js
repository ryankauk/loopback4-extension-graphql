"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@loopback/core");
var GraphQLBindings;
(function (GraphQLBindings) {
    // RestServer-specific bindings
    GraphQLBindings.CONFIG = `${core_1.CoreBindings.APPLICATION_CONFIG}#graphql`;
    GraphQLBindings.PORT = 'graphql.port';
    GraphQLBindings.HANDLER = 'graphql.handler';
    GraphQLBindings.API_SPEC = 'graphql.apiSpec';
    GraphQLBindings.SEQUENCE = 'graphql.sequence';
})(GraphQLBindings = exports.GraphQLBindings || (exports.GraphQLBindings = {}));
//# sourceMappingURL=keys.js.map