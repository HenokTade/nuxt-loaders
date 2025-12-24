const PREFIX = "[nuxt-loaders]"

export const logWarn = (...log: any[]) => {
    console.warn(`${PREFIX}:warn`, ...log)
}

export const logError = (...log: any[]) => {
    console.error(`${PREFIX}:error`, ...log)
}

export const logInfo = (...log: any[]) => {
    console.log(`${PREFIX}:info`, ...log)
}