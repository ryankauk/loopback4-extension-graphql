/// <reference types="node" />
import { Server as HttpServer } from 'http';
import { Server as HttpsServer } from 'https';
import { FindRoute, InvokeMethod, ParseParams, Reject, RequestContext, Send, SequenceHandler } from '@loopback/rest';
import { GraphqlAdapter } from '@ryankauk/graphql';
import { GraphQLServer } from 'graphql-yoga';
export declare class MySequence implements SequenceHandler {
    protected findRoute: FindRoute;
    protected parseParams: ParseParams;
    protected invoke: InvokeMethod;
    send: Send;
    reject: Reject;
    constructor(findRoute: FindRoute, parseParams: ParseParams, invoke: InvokeMethod, send: Send, reject: Reject);
    handle(context: RequestContext): Promise<void>;
}
export declare class MyGraphqlAdapter implements GraphqlAdapter<GraphQLServer> {
    defaultServer: GraphQLServer;
    httpServer: HttpServer | HttpsServer;
    constructor(schema: any);
    start(): Promise<void>;
    stop(): Promise<void>;
}
