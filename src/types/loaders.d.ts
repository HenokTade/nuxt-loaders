declare module '@nuxt/schema' {
    interface PublicRuntimeConfig {
        loaders: {
            autoSetup: boolean;
            routeRules: { [key: string]: string };
            loadersDir?: string;
            _activeLoader: string;
            _defaultLoader: string;
        }
    }
}

export { }