# Part B: JavaScript Quality Checks

Scope: Task 3 (Prettier), Task 4 (Mocha), and Task 5 (automating quality checks).
The calculator is a small prerequisite example for demonstrating the tests.

## Prerequisites

- Node.js 22 or newer, npm, and Git.
- Write access to the group's public GitHub repository for publishing.

## Setup and Commands

Run these commands from the repository root:

```sh
npm ci
npm run format
npm run format:check
npm test
npm run check
```

- `format` fixes formatting with Prettier.
- `format:check` reports formatting problems without changing files.
- `test` runs Mocha tests using Node's built-in assertions.
- `check` checks formatting, then runs tests only if formatting passes.

## Tasks and Files

| Task          | Files                                                 | Result                                                            |
| ------------- | ----------------------------------------------------- | ----------------------------------------------------------------- |
| 3: Prettier   | `.prettierrc.json`, `.prettierignore`, `package.json` | Consistent formatting with a non-writing check.                   |
| 4: Mocha      | `src/calculator.js`, `test/calculator.test.js`        | Five tests cover addition, zero, decimals, and invalid inputs.    |
| 5: Automation | `package.json`, `.github/workflows/quality.yml`       | One local check and automatic checks on pushes and pull requests. |

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
git add README.md package.json package-lock.json .gitignore .prettierignore .prettierrc.json src/calculator.js test/calculator.test.js .github/workflows/quality.yml
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
   Demonstrate `npm run format:check`, then `npm run format` if needed.
3. **Task 4 (1 minute):** show `add` and its tests; run `npm test`.
4. **Task 5 (1 minute):** show `npm run check` and the workflow in the PR.
   Explain that a failed command makes the CI job fail.
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
