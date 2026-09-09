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

The site under test has a real backend — submitting the "add expense" form persists data. Tests use unique, timestamped titles to avoid collisions between runs.
