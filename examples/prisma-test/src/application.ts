import {BootMixin} from '@loopback/boot';
import {ApplicationConfig, Application} from '@loopback/core';

import {ServiceMixin} from '@loopback/service-proxy';

import {MyGraphqlAdapter} from './sequence';
import {GraphQlComponent, GraphQLBindings} from '@ryankauk/graphql';

export class PrismaTestApplication extends BootMixin(
  ServiceMixin(Application),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);
    // boot

    // server

    this.bind(GraphQLBindings.ADAPTER).toClass(MyGraphqlAdapter);

    this.component(GraphQlComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }
}
