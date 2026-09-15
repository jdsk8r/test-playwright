import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  globalTimeout: 10 * 60 * 1000,
  fullyParallel: true,
  reporter: [
    ['list', { printSteps: true, printFailuresInline: true }],
    ['html', { open: 'never' }],
  ],
  use: {
    baseURL: 'https://expenses-react.sanchezrolfsen.no/',
    trace: 'on',
    testIdAttribute: "cy-data-selector",
    actionTimeout: 10_000,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
    },
  ],
});
