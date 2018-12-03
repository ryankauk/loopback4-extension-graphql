import {inject} from '@loopback/context';
import {Server as HttpServer} from 'http';
import {Server as HttpsServer} from 'https';
import {
  FindRoute,
  InvokeMethod,
  ParseParams,
  Reject,
  RequestContext,
  RestBindings,
  Send,
  SequenceHandler,
} from '@loopback/rest';
import {
  MiddlewareHander,
  IMiddlewareResolver,
  GraphqlAdapter,
  GraphQLBindings,
} from '@ryankauk/graphql';
const SequenceActions = RestBindings.SequenceActions;
import {AuthenticationBindings, AuthenticateFn} from '@loopback/authentication';
import {GraphQLServer} from 'graphql-yoga';
export class MySequence implements SequenceHandler {
  constructor(
    @inject(SequenceActions.FIND_ROUTE) protected findRoute: FindRoute,
    @inject(SequenceActions.PARSE_PARAMS) protected parseParams: ParseParams,
    @inject(SequenceActions.INVOKE_METHOD) protected invoke: InvokeMethod,
    @inject(SequenceActions.SEND) public send: Send,
    @inject(SequenceActions.REJECT) public reject: Reject,
  ) {}

  async handle(context: RequestContext) {
    try {
      const {request, response} = context;
      const route = this.findRoute(request);
      const args = await this.parseParams(request, route);
      const result = await this.invoke(route, args);
      this.send(response, result);
    } catch (err) {
      this.reject(context, err);
    }
  }
}

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
