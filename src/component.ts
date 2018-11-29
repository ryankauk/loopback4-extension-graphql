import {
  Component,
  CoreBindings,
  ProviderMap,
  Server,
  Application,
} from '@loopback/core';

import {inject, Constructor} from '@loopback/context';
import {GraphQLBindings} from './keys';
import {GraphQlServer} from './server';

export class GraphQlComponent implements Component {
  providers: ProviderMap = {};
  servers: {
    [name: string]: Constructor<Server>;
  } = {
    GraphQlServer,
  };

  constructor(
    @inject(CoreBindings.APPLICATION_INSTANCE) app: Application,
    @inject(GraphQLBindings.CONFIG) config?: GraphQlComponentConfig,
  ) {
    if (!config) config = {};
  }
}

export interface GraphQlComponentConfig {}
