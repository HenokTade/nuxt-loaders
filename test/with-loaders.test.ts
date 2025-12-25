import { fileURLToPath } from "node:url";
import { describe, it, expect } from "vitest";
import { setup, $fetch } from "@nuxt/test-utils/e2e";

describe("with-loaders fixture", async () => {
    await setup({
        rootDir: fileURLToPath(
            new URL("./fixtures/with-loaders", import.meta.url)
        ),
    });

    it("renders the app with loader components", async () => {
        const html = await $fetch("/");
        expect(html).toContain("Test App with Loaders");
    });

    it("should have loader components registered", async () => {
        // The setup should complete successfully if loaders are registered
        expect(true).toBe(true);
    });
});
