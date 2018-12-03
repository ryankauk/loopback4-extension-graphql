import {Server as HttpServer} from 'http';
import {Server as HttpsServer} from 'https';
import {GraphqlAdapter} from '@ryankauk/graphql';
import {GraphQLServer} from 'graphql-yoga';

export class MyGraphqlAdapter implements GraphqlAdapter<GraphQLServer> {
  defaultServer: GraphQLServer;
  httpServer: HttpServer | HttpsServer;
  constructor() {}
  graphQlInit(schema: any) {
    this.defaultServer = new GraphQLServer({
      schema,
      // middlewares: this._handler.handle(),
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
  async start() {
    this.httpServer = await this.defaultServer.start({
      // endpoint: this.endpoint,
    });

    return Promise.resolve();
  }
  async stop() {
    return new Promise<void>((resolve, reject) => {
      this.httpServer.close(() => resolve());
    });
  }
}
