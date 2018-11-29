import {Request, RestBindings, get, ResponseObject} from '@loopback/rest';
import {inject} from '@loopback/context';
import {Resolver, Query, Ctx, Arg} from '@ryankauk/graphql';
import {authenticate} from '@loopback/authentication';
/**
 * OpenAPI response for ping()
 */
const PING_RESPONSE: ResponseObject = {
  description: 'Ping Response',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          greeting: {type: 'string'},
          date: {type: 'string'},
          url: {type: 'string'},
          headers: {
            type: 'object',
            properties: {
              'Content-Type': {type: 'string'},
            },
            additionalProperties: true,
          },
        },
      },
    },
  },
};

/**
 * A simple controller to bounce back http requests
 */
@Resolver()
export class PingController {
  constructor(@inject(RestBindings.Http.REQUEST) private req: Request) {}

  // Map to `GET /ping`
  @get('/ping', {
    responses: {
      '200': PING_RESPONSE,
    },
  })
  @authenticate('Auth0Strategy')
  @Query(returns => String, {nullable: true})
  ping(@Arg('data') newRecipeData: string, @Ctx() ctx: any): String {
    // console.log(parent, args, context, info);
    // Reply with a greeting, the current time, the url, and request headers
    return 'hello';
  }
}
