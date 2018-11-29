import {PrismaTestApplication} from './application';
import {ApplicationConfig} from '@loopback/core';

export {PrismaTestApplication};

export async function main(options: ApplicationConfig = {}) {
  const app = new PrismaTestApplication(options);
  await app.boot();
  await app.start();

  return app;
}
