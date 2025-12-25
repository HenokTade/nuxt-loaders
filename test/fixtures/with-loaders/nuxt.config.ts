export default defineNuxtConfig({
    modules: ["nuxt-loaders"],
    loaders: {
        loadersDir: "app/components/loaders",
        autoSetup: true,
        routeRules: {
            "/": "TestLoader",
            "/admin/*": "AdminLoader",
        },
    },
});
