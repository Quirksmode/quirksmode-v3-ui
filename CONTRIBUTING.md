# Contributing

When contributing to this repository we have outlined a number of guidelines to
follow from coding standards to our source control strategy, these are all
extended from our internal coding standards at Beyond. The following document
outlines each of these and must be followed if you wish to contribute to this
repository.

## Coding Standards

Following a consistent coding standard helps improve the quality of the overall
codebase. The key to a good coding standard is consistency. Completed source
code should reflect a harmonized style, as if a single developer wrote the code
in one session.

The more readable source code is, the easier it is for someone to maintain that
code. By following a consistent style, it allows other developers to step in and
help with maintenance or new development.

### Code Documenting

Good code should be readable although that's not always the case, complex
algorithms or modules with depedencies on different pieces of the codebase can
become timeconsuming to follow. As such we enforce inline code documentation and
comments to save time when revisiting code and to give a quick overview of
functionality without having to dive too deep into the code.

At a block level you must ensure your documentation is following the
[JSDoc](http://usejsdoc.org/) syntax, this should provide a clear description
surrounding functions, methods, classes and variables with example usage and
details on the parameters or return values. Any edge cases or depedencies on
other services and modules should be clearly outlined in this documentation.

Individual areas of your code which live outside of a block but need general
explanation should include an inline comment with a forward slash
prefix `// This does a, b and c`.

### JavaScript Standards

We have adopted and follow the airbnb JavaScript styleguide, you can find
reference to this documentation on their
[GitHub](https://github.com/airbnb/javascript). These standards are enforced via
eslint, you must ensure that your code is passing eslint before merging any pull
requests.

#### PostCSS Standards

All styles should following the
[BEM Methodology](https://en.bem.info/methodology/) and have a clear descriptive
selector.

Any styles must pass our [stylelint config](./stylelintrc).

#### Commit Messages

Ensure your commit messages are well formatted and include a valid jira ticket
and type reference. The following format is enforced via commit hooks. Where
possible try to limit your amount of commit messages per pull request either
via a rebase or `git commit --amend`

```text
[FTN-XX] fix|feature|refactor|epic: A message relating to your change
```

### Testing

All JavaScript modules and accessible pages should include both a Unit and E2E
test. We aim for 80% code coverage although we realise this is not always
feasible, this will be a good target to aim for.

## Pull Requests

When contributing to this codebase you must follow the gitflow architecture,
you should branch from develop with a brand name relating to the type of task
and jira ticket `git checkout develop && git checkout -b feature/FTN-XX`

### Pull Request Process

- If adding new api's or updates to installation ensure this is refecleted in
  the README.md
- If adding new enviroment variables ensure these are included in both the
  README.md and .env.example
- Ensure git commit messages follow the above message standards

1. Create branch from develop including Jira Ticket and Task (bugfix|feature|epic|task)
2. Update the README.md with details of changes to the interface, this includes
   new environment variables, exposed ports, useful file locations and container
   parameters.
3. Update `.env.example` with any updated enviroment variables
4. If adding new depedencies ensure these are included in both package.json and
   package-lock.json and that they are installed with the
   `--save-dev|--save` post-fix.
5. Update the CHANGELOG.md on the unreleased section with the updates you've made
6. You may merge the pull request once you have the an approved code review from
   two other developers, or if you do not have permission to do that, you may
   request the second reviewer to merge it for you. Any merged pull request
   should have it's original branch deleted. Before merging you must ensure that
   CI pipelines and tests are passing.
