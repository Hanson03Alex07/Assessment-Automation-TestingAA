## Summary 
This version uses [The Internet app](https://the-internet.herokuapp.com) as the demo application.

### Selenium tests:
- User login at `/login`
- Adding and removing elements at `/add_remove_elements/`
- Page Object Model for login page
- Explicit waits and screenshots on failure
- 
### Playwright tests:
- Uses Playwright Test runner (`@playwright/test`)
- Covers login interaction on `/login`
- 
### Shared utility:
- `addTimestampToString()` appends a timestamp to usernames
- 
### GitHub Actions CI:
- Workflow added in `.github/workflows/ci.yml'
  
## Setup
1. Install Node.js (>=18)
2. Clone repo and install dependencies:
npm install
npx playwright install

## Running tests
Selenium:
BASE_URL=https://the-internet.herokuapp.com 
npm run test:selenium

Playwright:
BASE_URL=https://the-internet.herokuapp.com 
npm run test:playwright

## Project structure
```bash
/src
  /pages
    LoginPage.js
  /tests
    /selenium
      tests.spec.js
    /playwright
      login.spec.js
  /utils
    utils.js
.github/workflows/ci.yml
```

## Notes
- Default `BASE_URL` is `https://the-internet.herokuapp.com` if not provided.
- Selenium assumes ChromeDriver in PATH.
