import { defineNuxtPlugin } from '#app'
import { markRaw } from 'vue'

export default defineNuxtPlugin((nuxtApp) => {
    // Registry to store loader components
    const loaderRegistry = new Map()

    // Provide methods to register and get loaders
    nuxtApp.provide('loaderRegistry', {
        register: (name: string, component: any) => {
            loaderRegistry.set(name, markRaw(component))
        },
        get: (name: string) => {
            return loaderRegistry.get(name)
        },
        has: (name: string) => {
            return loaderRegistry.has(name)
        }
    })
})
