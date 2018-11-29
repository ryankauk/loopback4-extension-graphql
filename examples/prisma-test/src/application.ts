import {BootMixin} from '@loopback/boot';
import {ApplicationConfig, Application} from '@loopback/core';
import {
  AuthenticationComponent,
  AuthenticationBindings,
} from '@loopback/authentication';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import * as path from 'path';
import {MySequence, MiddlewareHandler} from './sequence';
import {GraphQlComponent, GraphQLBindings} from '@ryankauk/graphql';

export class PrismaTestApplication extends BootMixin(
  ServiceMixin(Application),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);
    // boot

    // server

    this.bind(GraphQLBindings.HANDLER).toClass(MiddlewareHandler);

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
