import { Server, Application } from '@loopback/core';
import { Context } from '@loopback/context';
export declare class GraphQlServer extends Context implements Server {
    protected app: Application;
    private server;
    private httpServer;
    listening: boolean;
    constructor(app: Application);
    start(): Promise<void>;
    stop(): Promise<void>;
}
