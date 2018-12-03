"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const boot_1 = require("@loopback/boot");
const core_1 = require("@loopback/core");
const service_proxy_1 = require("@loopback/service-proxy");
const sequence_1 = require("./sequence");
const graphql_1 = require("@ryankauk/graphql");
class PrismaTestApplication extends boot_1.BootMixin(service_proxy_1.ServiceMixin(core_1.Application)) {
    constructor(options = {}) {
        super(options);
        // boot
        // server
        this.component(graphql_1.GraphQlComponent);
        this.bind(graphql_1.GraphQLBindings.HANDLER).toClass(sequence_1.MyGraphqlAdapter);
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
exports.PrismaTestApplication = PrismaTestApplication;
//# sourceMappingURL=application.js.map