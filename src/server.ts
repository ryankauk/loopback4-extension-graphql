import {Server, CoreBindings, Application} from '@loopback/core';

import {inject, Context, Constructor} from '@loopback/context';
import {GraphQLServer} from 'graphql-yoga';
import {Server as HttpServer} from 'http';
import {Server as HttpsServer} from 'https';
import {GraphQLBindings} from './keys';
import {buildSchemaSync} from 'type-graphql';
import {MiddlewareHander} from './middleware';
export interface GraphqlAdapter<GraphqlServer> {
  start(): Promise<void>;
  stop(): Promise<void>;
  graphQlInit(schema: any): void;
}

interface AdpapterFunction {
  (): Promise<void>;
}
export class GraphQlServer<GraphqlServer = GraphQLServer> extends Context
  implements Server {
  private defaultServer: GraphQLServer;
  private httpServer: HttpServer | HttpsServer;
  listening: boolean = false;

  generatedSchema: any;
  _start: AdpapterFunction;
  _stop: AdpapterFunction;
  constructor(
    @inject(CoreBindings.APPLICATION_INSTANCE) protected app: Application,
    @inject(GraphQLBindings.ADAPTER)
    protected adapter: GraphqlAdapter<GraphqlServer>,
  ) {
    super(app);

    let resolvers = this.find('controllers.*').map(b => b.valueConstructor);
    if (!resolvers || resolvers.length <= 0) {
      this.generatedSchema = [];
    } else {
      this.generatedSchema = buildSchemaSync({
        resolvers: this.find('controllers.*').map(b => b.valueConstructor),
      });
    }

    app.bind(GraphQLBindings.SCHEMA).to(this.generatedSchema);

    adapter.graphQlInit(this.generatedSchema);
  }

  async start(): Promise<void> {
    if (this.adapter && this.adapter.start) return this.adapter.start();
    console.warn("Graphql Server start isn't attached");
  }

  async stop(): Promise<void> {
    if (this.adapter && this.adapter.stop) return this.adapter.stop();
  }
}
