import {Server, CoreBindings, Application} from '@loopback/core';

import {inject, Context, Constructor} from '@loopback/context';
import {GraphQLServer as YogaServer} from 'graphql-yoga';
import {Server as HttpServer} from 'http';
import {Server as HttpsServer} from 'https';
import {GraphQLBindings} from './keys';
import {buildSchemaSync} from 'type-graphql';
import {MiddlewareHander} from './middleware';

export class GraphQlServer extends Context implements Server {
  private server: YogaServer;
  private httpServer: HttpServer | HttpsServer;
  listening: boolean = false;
  endpoint = '/graphql';
  constructor(
    @inject(CoreBindings.APPLICATION_INSTANCE) protected app: Application,
    @inject(GraphQLBindings.HANDLER) protected _handler: MiddlewareHander,
  ) {
    super(app);

    this.app.bind(GraphQLBindings.ENDPOINT).to(this.endpoint);

    const schema = buildSchemaSync({
      resolvers: this.find('controllers.*').map(b => b.valueConstructor),
    });

    this.server = new YogaServer({
      schema,
      middlewares: this._handler.handle(),
      context: ({request}) => {
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

  handler(value: Constructor<MiddlewareHander>) {
    this.bind(GraphQLBindings.HANDLER).toClass(value);
  }

  async start(): Promise<void> {
    this.httpServer = await this.server.start({
      endpoint: this.endpoint,
    });

    this.listening = true;
    return Promise.resolve();
  }

  async stop(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.httpServer.close(() => resolve());
    });
  }
}
