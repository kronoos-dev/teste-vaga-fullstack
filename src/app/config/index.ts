import nodeConfig from "config";

import { IApplicationConfig } from "./application";
import { ICSVConfig } from "./csv";

export interface IAppConfig {
    application: IApplicationConfig;
    csv: ICSVConfig;
}

const config: IAppConfig = {
    application: nodeConfig.get<IApplicationConfig>("application"),
    csv: nodeConfig.get<ICSVConfig>("csv"),
};

export default config;
export * from "./validation";
