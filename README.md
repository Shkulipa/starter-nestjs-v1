## Installation
```
yarn
```

## Run Application
if you need a get up the mongoDB localy, use it:
```
yarn docker:compose
```
then open in browser: http://localhost:8081 (for UI of DB)

if you wanna run from deployed on the production or staging, run this:
```
1. yarn start:prod (will take variables from .env.production)
2. yarn start:dev  (will take variables from .env.development)
3. yarn start:local (will take variables from .env.local)
4. yarn prod (run dist/main)
```

## Commits
1. yarn commit
2. git commit "fix|merge|docs: ..."

If an error occurs during the commit:
```
Aborting commit. Your commit message is invalid.(Please, check README.md)
```
Your commit should be like "feat: YOUR_DESCRIPTION_COMMIT"
for merge "Merge dev to prod"
feat - you can change on the another word like: feat|fix|chore|docs|test|style|refactor|perf|build|ci|revert|content

Also, you commit shouldn't more than 88 characters
(You can check file with rules: .husky/commit-msg)


## CI/CD (deploy)


## CLI
docs: https://docs.nestjs.com/cli/overview
```
1. nest generate --help
2. nest generate res --no-spec
```

## Errors Exceptions in Nestjs
classes: https://docs.nestjs.com/exception-filters
status: https://medium.com/@abeythilakeudara3/nestjs-exception-filters-part-02-24afcbe116cf

## Folder Structure
docs: https://medium.com/the-crowdlinker-chronicle/best-way-to-structure-your-directory-code-nestjs-a06c7a641401

## Migrations
common commands:
```
yarn migrate:help
```

migrations are using the "migrations.ts" file,
```
migrate:prod:status (for prod DB)
migrate:dev:status (for dev DB)
migrate:local:status (for local DB)
...
```

for seeds are using "seeds.ts", and follow commands:
```
seeds:prod:status (for prod DB)
seeds:dev:status (for dev DB)
seeds:local:status (for local DB)
```

# Tests
tutorials:
1. https://www.youtube.com/watch?v=1Vc6Xw8FMpg&ab_channel=MichaelGuay

