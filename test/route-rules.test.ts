import { describe, it, expect } from "vitest";
import {
    validateLoaderRules,
    getDefaultLoader,
    getActiveLoader,
} from "../src/runtime/lib/utils/route-rules";

describe("validateLoaderRules", () => {
    it("should validate correct route patterns", () => {
        const rules = {
            "/": "HomeLoader",
            "/admin": "AdminLoader",
            "/admin/*": "AdminWildcardLoader",
        };

        const result = validateLoaderRules(rules);

        expect(result).toEqual({
            "/": "HomeLoader",
            "/admin": "AdminLoader",
            "/admin/*": "AdminWildcardLoader",
        });
    });

    it("should normalize routes by removing trailing slashes", () => {
        const rules = {
            "/admin/": "AdminLoader",
            "/dashboard/": "DashboardLoader",
        };

        const result = validateLoaderRules(rules);

        expect(result).toEqual({
            "/admin": "AdminLoader",
            "/dashboard": "DashboardLoader",
        });
    });

    it("should skip invalid loader names", () => {
        const rules = {
            "/": "ValidLoader",
            "/admin": "123InvalidLoader", // starts with number
            "/dashboard": "Invalid@Loader", // contains special char
        };

        const result = validateLoaderRules(rules);

        expect(result).toEqual({
            "/": "ValidLoader",
        });
    });

    it("should skip empty or whitespace-only routes", () => {
        const rules = {
            "": "EmptyLoader",
            "   ": "WhitespaceLoader",
            "/valid": "ValidLoader",
        };

        const result = validateLoaderRules(rules);

        expect(result).toEqual({
            "/valid": "ValidLoader",
        });
    });

    it("should skip routes with empty loader names", () => {
        const rules = {
            "/": "",
            "/admin": "   ",
            "/valid": "ValidLoader",
        };

        const result = validateLoaderRules(rules);

        expect(result).toEqual({
            "/valid": "ValidLoader",
        });
    });

    it("should accept valid loader names with hyphens and underscores", () => {
        const rules = {
            "/": "My-Loader",
            "/admin": "Admin_Loader",
            "/dashboard": "Dashboard-Loader_123",
        };

        const result = validateLoaderRules(rules);

        expect(result).toEqual({
            "/": "My-Loader",
            "/admin": "Admin_Loader",
            "/dashboard": "Dashboard-Loader_123",
        });
    });

    it("should handle wildcard route '*'", () => {
        const rules = {
            "*": "DefaultLoader",
            "/admin": "AdminLoader",
        };

        const result = validateLoaderRules(rules);

        expect(result).toEqual({
            "*": "DefaultLoader",
            "/admin": "AdminLoader",
        });
    });

    it("should return empty object for null or undefined input", () => {
        expect(validateLoaderRules(null as any)).toEqual({});
        expect(validateLoaderRules(undefined as any)).toEqual({});
    });

    it("should skip routes that don't start with '/'", () => {
        const rules = {
            "/valid": "ValidLoader",
            "invalid": "InvalidLoader",
            "also-invalid": "AnotherInvalidLoader",
        };

        const result = validateLoaderRules(rules);

        expect(result).toEqual({
            "/valid": "ValidLoader",
        });
    });
});

describe("getDefaultLoader", () => {
    it("should return loader for '/' route", () => {
        const rules = {
            "/": "HomeLoader",
            "/admin": "AdminLoader",
        };

        const result = getDefaultLoader(rules);

        expect(result).toBe("HomeLoader");
    });

    it("should return loader for '*' route", () => {
        const rules = {
            "*": "DefaultLoader",
            "/admin": "AdminLoader",
        };

        const result = getDefaultLoader(rules);

        expect(result).toBe("DefaultLoader");
    });

    it("should prioritize '*' over '/' when both exist", () => {
        const rules = {
            "/": "HomeLoader",
            "*": "WildcardLoader",
            "/admin": "AdminLoader",
        };

        const result = getDefaultLoader(rules);

        expect(result).toBe("WildcardLoader");
    });

    it("should return empty string when no default route exists", () => {
        const rules = {
            "/admin": "AdminLoader",
            "/dashboard": "DashboardLoader",
        };

        const result = getDefaultLoader(rules);

        expect(result).toBe("");
    });

    it("should handle empty rules object", () => {
        const result = getDefaultLoader({});

        expect(result).toBe("");
    });
});

describe("getActiveLoader", () => {
    it("should return exact route match", () => {
        const rules = {
            "/": "HomeLoader",
            "/admin": "AdminLoader",
        };

        const result = getActiveLoader(rules, "/admin");

        expect(result).toBe("AdminLoader");
    });

    it("should return empty string when no match found", () => {
        const rules = {
            "/admin": "AdminLoader",
        };

        const result = getActiveLoader(rules, "/dashboard");

        expect(result).toBe("");
    });

    it("should return the most specific matching route", () => {
        const rules = {
            "/": "HomeLoader",
            "/admin": "AdminLoader",
            "/admin/users": "AdminUsersLoader",
        };

        const result = getActiveLoader(rules, "/admin/users");

        expect(result).toBe("AdminUsersLoader");
    });

    it("should handle empty rules", () => {
        const result = getActiveLoader({}, "/any-path");

        expect(result).toBe("");
    });
});
