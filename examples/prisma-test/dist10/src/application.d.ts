import { ApplicationConfig, Application } from '@loopback/core';
declare const PrismaTestApplication_base: (new (...args: any[]) => {
    [x: string]: any;
    projectRoot: string;
    bootOptions?: import("@loopback/boot/dist/src/interfaces").BootOptions | undefined;
    boot(): Promise<void>;
    booters(...booterCls: import("@loopback/context/dist/src/value-promise").Constructor<import("@loopback/boot/dist/src/interfaces").Booter>[]): import("@loopback/context/dist/src/binding").Binding<any>[];
    component(component: import("@loopback/context/dist/src/value-promise").Constructor<{}>): void;
    mountComponentBooters(component: import("@loopback/context/dist/src/value-promise").Constructor<{}>): void;
}) & (new (...args: any[]) => {
    [x: string]: any;
    serviceProvider<S>(provider: import("@loopback/service-proxy/dist/src/mixins/service.mixin").Class<import("@loopback/context/dist/src/provider").Provider<S>>): void;
    component(component: import("@loopback/service-proxy/dist/src/mixins/service.mixin").Class<{}>): void;
    mountComponentServices(component: import("@loopback/service-proxy/dist/src/mixins/service.mixin").Class<{}>): void;
}) & typeof Application;
export declare class PrismaTestApplication extends PrismaTestApplication_base {
    constructor(options?: ApplicationConfig);
}
export {};
