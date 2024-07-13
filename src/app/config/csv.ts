export interface ICSVProcessingConfig {
    inputBasePath?: string;
    outputBasePath?: string;
}

export interface ICSVConfig {
    processing: ICSVProcessingConfig;
}
