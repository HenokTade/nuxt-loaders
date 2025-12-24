// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["nuxt-loaders"],
  loaders: {
    // Directory containing your loader components
    // Default: 'app/components/loaders'
    loadersDir: "app/components/loaders",

    // Automatically setup the module
    // Default: true
    autoSetup: true,

    // Define rules for which loader to use on which route
    routeRules: {
      "/": "MyLoader",
      "/admin/*": "AdminLoader",
    },
  },
})