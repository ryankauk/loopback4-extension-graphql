import {IMiddlewareFunction} from 'graphql-middleware';
import {GraphQLResolveInfo} from 'graphql';
export interface MiddlewareHander {
  handle: () => IMiddlewareResolver[] | never[];
}
export declare type IMiddlewareResolver<
  TSource = any,
  TContext = any,
  TArgs = any
> = (
  resolve: (
    parent: TSource,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo,
  ) => Promise<any>,
  parent: TSource,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<any>;

export class DefaultHandler implements MiddlewareHander {
  constructor() {}
  handle() {
    return [];
  }
}
