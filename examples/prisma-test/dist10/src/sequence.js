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
const context_1 = require("@loopback/context");
const rest_1 = require("@loopback/rest");
const graphql_1 = require("@ryankauk/graphql");
const SequenceActions = rest_1.RestBindings.SequenceActions;
const graphql_yoga_1 = require("graphql-yoga");
let MySequence = class MySequence {
    constructor(findRoute, parseParams, invoke, send, reject) {
        this.findRoute = findRoute;
        this.parseParams = parseParams;
        this.invoke = invoke;
        this.send = send;
        this.reject = reject;
    }
    async handle(context) {
        try {
            const { request, response } = context;
            const route = this.findRoute(request);
            const args = await this.parseParams(request, route);
            const result = await this.invoke(route, args);
            this.send(response, result);
        }
        catch (err) {
            this.reject(context, err);
        }
    }
};
MySequence = __decorate([
    __param(0, context_1.inject(SequenceActions.FIND_ROUTE)),
    __param(1, context_1.inject(SequenceActions.PARSE_PARAMS)),
    __param(2, context_1.inject(SequenceActions.INVOKE_METHOD)),
    __param(3, context_1.inject(SequenceActions.SEND)),
    __param(4, context_1.inject(SequenceActions.REJECT)),
    __metadata("design:paramtypes", [Function, Function, Function, Function, Function])
], MySequence);
exports.MySequence = MySequence;
let MyGraphqlAdapter = class MyGraphqlAdapter {
    constructor(schema) {
        this.defaultServer = new graphql_yoga_1.GraphQLServer({
            schema,
            // middlewares: this._handler.handle(),
            context: ({ request }) => {
                const ctx = {
                    // create mocked user in context
                    // in real app you would be mapping user from `request.user` or sth
                    user: {
                        id: 1,
                        name: 'Sample user',
                        roles: ['REGULAR'],
                    },
                };
                return ctx;
            },
        });
    }
    async start() {
        this.httpServer = await this.defaultServer.start({
        // endpoint: this.endpoint,
        });
        return Promise.resolve();
    }
    async stop() {
        return new Promise((resolve, reject) => {
            this.httpServer.close(() => resolve());
        });
    }
};
MyGraphqlAdapter = __decorate([
    __param(0, context_1.inject(graphql_1.GraphQLBindings.SCHEMA)),
    __metadata("design:paramtypes", [Object])
], MyGraphqlAdapter);
exports.MyGraphqlAdapter = MyGraphqlAdapter;
//# sourceMappingURL=sequence.js.map