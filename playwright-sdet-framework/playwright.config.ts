import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",

  projects: [
    {
      name: "setup",
      testMatch: /.*\.setup\.spec\.ts/,
    },
    {
      name: "chromium",
      use: {
        browserName: "chromium",
        baseURL: "https://opensource-demo.orangehrmlive.com",
        storageState: "storageState.json",
        trace: "on-first-retry",
      },
      dependencies: ["setup"],
      testIgnore: /.*\.setup\.spec\.ts/,   // ⭐ important line
    },
  ],
});
