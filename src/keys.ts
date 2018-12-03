import {CoreBindings, BindingKey} from '@loopback/core';
import {GraphqlAdapter} from './server';
export namespace GraphQLBindings {
  // RestServer-specific bindings
  export const CONFIG = `${CoreBindings.APPLICATION_CONFIG}#graphql`;
  export const PORT = 'graphql.port';
  export const ENDPOINT = 'graphql.endpoint';

  export const API_SPEC = 'graphql.apiSpec';
  export const SCHEMA = 'graphql.schema';
  export const ADAPTER = BindingKey.create<GraphqlAdapter<any> | undefined>(
    'graphql.adapter',
  );
}
