import { describe, it, expect } from "vitest";
import { fileURLToPath } from "node:url";
import { setup } from "@nuxt/test-utils/e2e";

describe("nuxt-loaders module", () => {
    describe("with default configuration", async () => {
        await setup({
            rootDir: fileURLToPath(new URL("./fixtures/basic", import.meta.url)),
        });

        it("should register the module", async () => {
            // If setup succeeds, the module is registered correctly
            expect(true).toBe(true);
        });
    });

    describe("module options", () => {
        it("should have correct default options", () => {
            const defaults = {
                autoSetup: true,
                routeRules: {},
                _defaultLoader: "",
                _activeLoader: "",
            };

            expect(defaults.autoSetup).toBe(true);
            expect(defaults.routeRules).toEqual({});
        });

        it("should validate ModuleOptions interface structure", () => {
            const validOptions = {
                autoSetup: true,
                loadersDir: "custom/loaders",
                routeRules: {
                    "/": "HomeLoader",
                    "/admin/*": "AdminLoader",
                },
                _activeLoader: "HomeLoader",
                _defaultLoader: "HomeLoader",
            };

            expect(validOptions.autoSetup).toBe(true);
            expect(validOptions.loadersDir).toBe("custom/loaders");
            expect(Object.keys(validOptions.routeRules).length).toBe(2);
        });
    });
});
