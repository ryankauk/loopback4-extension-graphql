import { Component, ProviderMap, Server, Application } from '@loopback/core';
import { Constructor } from '@loopback/context';
export declare class GraphQlComponent implements Component {
    providers: ProviderMap;
    servers: {
        [name: string]: Constructor<Server>;
    };
    constructor(app: Application, config?: GraphQlComponentConfig);
}
export interface GraphQlComponentConfig {
}
