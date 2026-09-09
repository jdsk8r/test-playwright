# test-playwright

End-to-end tests for [expenses-react.sanchezrolfsen.no](https://expenses-react.sanchezrolfsen.no/) using [Playwright](https://playwright.dev/).

## Setup

```bash
npm install
npx playwright install
```

## Running tests

```bash
npm test              # headless, all browsers (Chromium, Firefox, Edge)
npm run test:headed   # with a visible browser window
npm run test:ui       # interactive UI mode
npm run report        # open the last HTML report
```

## Structure

- `playwright.config.ts` — base URL, browser projects (Chromium, Firefox, Edge)
- `tests/` — test specs
- `tests/pages/` — page objects (locators + actions for the app's pages)

## CI

Tests run automatically on push/PR to `main` via [GitHub Actions](.github/workflows/playwright.yml), with the HTML report uploaded as an artifact.

## Notes

Added expenses are only kept in the app's in-memory state (no backend persistence), so submitting the "add expense" form during tests doesn't leave any lasting data. Tests still use unique, timestamped titles as good practice to avoid collisions when tests run in parallel.
