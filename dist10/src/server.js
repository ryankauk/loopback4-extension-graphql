"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@loopback/core");
const context_1 = require("@loopback/context");
const graphql_yoga_1 = require("graphql-yoga");
const type_graphql_1 = require("type-graphql");
let GraphQlServer = class GraphQlServer extends context_1.Context {
    constructor(app) {
        super(app);
        this.app = app;
        this.listening = false;
        console.log(this.find('controllers.*'));
        const schema = type_graphql_1.buildSchemaSync({
            resolvers: [],
        });
        this.server = new graphql_yoga_1.GraphQLServer({
            schema,
        });
    }
    async start() {
        this.httpServer = await this.server.start();
        this.listening = true;
        return Promise.resolve();
    }
    async stop() {
        return new Promise((resolve, reject) => {
            this.httpServer.close(() => resolve());
        });
    }
};
GraphQlServer = __decorate([
    __param(0, context_1.inject(core_1.CoreBindings.APPLICATION_INSTANCE)),
    __metadata("design:paramtypes", [core_1.Application])
], GraphQlServer);
exports.GraphQlServer = GraphQlServer;
//# sourceMappingURL=server.js.map