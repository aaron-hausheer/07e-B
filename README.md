# Part B: JavaScript Quality Checks

Scope: Task 3 (Prettier), Task 4 (Mocha), and Task 5 (automating quality checks).
The formatting demo uses Prettier directly, and Mocha tests verify its output.
The calculator separately demonstrates behavior tests: formatting cannot catch
an incorrect calculation.

## Prerequisites

- Node.js 22.13 or newer, npm, and Git.
- Write access to the group's public GitHub repository for publishing.

## Setup and Commands

Run these commands from the repository root:

```sh
npm ci
npm start
npm run demo:format
npm run format
npm run format:check
npm run lint
npm test
npm run check
```

- `format` fixes formatting with Prettier.
- `format:check` reports formatting problems without changing files.
- `lint` runs ESLint's recommended JavaScript rules with Node and Mocha globals;
  errors and warnings fail the command.
- `test` runs Mocha tests using Node's built-in assertions.
- `check` checks formatting, lints, and tests without rewriting files (also used in CI).
- `start` formats files, lints, tests, and only then starts the Node formatting demo.

## Task 5: Startup Quality Gate

The `start` script is:

```json
"start": "npm run format && npm run lint && npm test && node examples/formatting.js"
```

`&&` runs each command only if the previous one succeeds. Prettier fixes
formatting first; ESLint then checks JavaScript issues, and Mocha checks behavior.
If formatting cannot complete, linting fails, or a test fails, the app does not
start. Fix the reported issue and run `npm start` again.

`eslint.config.js` enables the recommended ESLint rules for JavaScript modules,
Node globals, and Mocha globals in test files. It ignores generated coverage.
The application entry point is the existing `examples/formatting.js` demo.

## Prettier and Mocha Example

Run `npm run demo:format` to print before/after code and formatting check results.
The intentionally unformatted input is a string, so it does not make the
repository's own formatting check fail:

```js
function greet(name) {
  return 'Hello, ' + name;
}
```

Prettier applies the project's configuration:

```js
function greet(name) {
  return 'Hello, ' + name;
}
```

`src/formatter.js` calls Prettier's `format`, `check`, and `resolveConfig` APIs.
`examples/formatting.js` prints the demonstration without rewriting files.

`test/formatter.test.js` uses Mocha's `describe`, `beforeEach`, and `it` with
async tests and Node assertions. Its six tests verify configured formatting,
unformatted input detection, acceptance after formatting, repeatable formatting,
syntax error rejection, and the fact that Prettier does not detect logic bugs.
The five calculator tests illustrate how behavior assertions catch those bugs.

To run only the tool-specific tests:

```sh
npm test -- --grep "JavaScript formatting"
```

## Tasks and Files

| Task          | Files                                                                               | Result                                                            |
| ------------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| 3: Prettier   | `.prettierrc.json`, `.prettierignore`, `src/formatter.js`, `examples/formatting.js` | Configured formatting, checks, and a before/after demo.           |
| 4: Mocha      | `test/formatter.test.js`, `test/calculator.test.js`                                 | Six formatting tests and five calculator behavior tests.          |
| 5: Automation | `package.json`, `.github/workflows/quality.yml`                                     | One local check and automatic checks on pushes and pull requests. |

`package-lock.json` pins dependencies so `npm ci` installs repeatably.
`.gitignore` keeps installed dependencies and generated output out of the PR.

## Branch and Pull Request

The repository's `main` branch is the starting point. Create the branch before
adding the Part B files:

```sh
git switch main
git switch -c poster-course
```

After implementing and checking Part B, publish only its files:

```sh
npm run check
git add README.md package.json package-lock.json eslint.config.js .gitignore .prettierignore .prettierrc.json src/calculator.js src/formatter.js examples/formatting.js test/calculator.test.js test/formatter.test.js .github/workflows/quality.yml
git commit -m "Add Part B: Prettier, Mocha, and automated quality checks"
git push -u origin poster-course
```

Open a pull request with base `main` and compare `poster-course`. Review the
Files changed tab for unrelated changes and wait for the quality check result.
Post the public repository link in Teams and send the PR link to the teacher
before the poster walk. Fix feedback on `poster-course` and push again.

## Five-Minute PR Walkthrough

1. **Goal (30 seconds):** explain how formatting and tests detect different problems.
2. **Task 3 (1 minute):** show the Prettier configuration and formatting scripts.
   Run `npm run demo:format` to show before/after code and check results.
3. **Task 4 (1 minute):** show the async formatting tests and `beforeEach` hook;
   run `npm test`. Contrast formatting checks with calculator behavior assertions.
4. **Task 5 (1 minute):** run `npm start` to demonstrate format, lint, test, then
   app startup. Show `npm run check` and the workflow in the PR; explain that a
   failed command stops startup or makes the CI job fail.
5. **Result (1 minute 30 seconds):** show the PR diff and checks, answer questions,
   and explain that CI reports failures but branch protection must be configured
   separately to block merging.

For a failure demonstration, temporarily change an expected test result, run
`npm test`, then restore it and rerun `npm run check`. Do not commit the failure.

## Poster Walk Hosting

There are four rounds of five minutes. Exactly one student hosts each round;
everyone else visits another station. Every student must explain at least once.
Replace A, B, and C with group members' names before presenting.

| Group size | Round 1 | Round 2 | Round 3 | Round 4 |
| ---------- | ------- | ------- | ------- | ------- |
| 2 students | A       | B       | A       | B       |
| 3 students | A       | B       | A       | C       |

With two students, each hosts twice and visits two other stations. With three,
A hosts twice and visits two stations; B and C host once each and can visit all
three other stations. Plan visits so students do not repeat a station.
