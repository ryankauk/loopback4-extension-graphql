import {CoreBindings} from '@loopback/core';

export namespace GraphQLBindings {
  // RestServer-specific bindings
  export const CONFIG = `${CoreBindings.APPLICATION_CONFIG}#graphql`;
  export const PORT = 'graphql.port';
  export const ENDPOINT = 'graphql.endpoint';

  export const API_SPEC = 'graphql.apiSpec';
  export const HANDLER = 'graphql.handler';
}
