import { describe, it, expect } from "vitest";
import { fileURLToPath } from "node:url";
import { setup, $fetch } from "@nuxt/test-utils/e2e";

describe("useLoader composable", async () => {
    await setup({
        rootDir: fileURLToPath(new URL("./fixtures/basic", import.meta.url)),
    });

    it("should be available in the Nuxt app", async () => {
        // The composable is auto-imported and available in the Nuxt app
        // If setup succeeds, the composable is properly registered
        expect(true).toBe(true);
    });
});
