# Rule 1: No ponies, pony-related characters, pony language or other pony-like paraphernalia

# Grace Shopper

## Outside resources

* [Trello](https://trello.com/b/UAFp6wFF/grace-shopper-main)
* [Team norms](https://docs.google.com/document/d/1c_ZfU2zF40nSO70C0C6ayu_g_MsfKglnzY44CFShgis/edit?ts=59f74af4)

## Running this code in development

`npm run start-dev` will make great things happen!

If you want to run the server and/or webpack separately, you can also `npm run start-server` and `npm run build-client`.

## Contribution guide

The contribution process is...

1. Make an issue on Github (or multiple issues)
1. Make a connected Trello card for your issue
1. Make a feature branch for your issue (feature-name-#{issue})
2. Make a PR that references that issue
3. Get it code reviewed by someone on the team, address any comments
4. Merge into master (with merge commit)

### Code style guide

- Pay attention to the linter!
- Use semicolons
- Two spaces -- for indentation
- Trailing commas where possible
- Use `const` or `let` over `var`
- Use `require` and `module.exports` in `.js` files
- Use `import` and `export` in `.jsx` files, unless `require` makes for cleaner code
- Put import statements at top
- Put the default export at bottom
- Consider splitting up any file larger than 50 lines
- Define container components and presentational components in separate files
- Use the ["ducks" pattern](https://github.com/erikras/ducks-modular-redux) for redux
- Name files using lowercase-and-dashes instead of camelCase or PascalCase, except for when the default export is a class, then use PascalCase
- Define react components as pure functions (instead of classes) whenever possible
- Single quotes for strings – except to avoid escaping
- No unused variables
- Space after keywords `if (condition) { ... }`
- Use arrow functions when possible
- Space after function name `function name (arg) { ... }`
- Always use `===` instead of `==`

### Linter Guide

* `npm install -g eslint`
* In the root of your project, `eslint --init`
* You will then be prompted to choose how you want to configure ESLint - follow the style guide above

### Commit message guide

* Types: chore, docs, feat, fix, refactor, style, or test
* Use present tense in summary
* [See here](https://seesparkbox.com/foundry/semantic_commit_messages)

### Misc.

* Consult team before installing new NPM modules
* No but for real, no ponies
