[![image](https://cms.quirksmode.co.uk/wp-content/uploads/2020/08/quirksmode-github.jpg)](https://www.quirksmode.co.uk)

## Welcome

Hi and welcome to version 3 of my Personal Portfolio. Sadly I am unable to share the code that I develop for clients professionally, so I have decided to make my personal portfolio repository public for the very first time.

My reason for doing this is to hopefully inspire/help other developers who are seeking to create something similar.

I am a huge fan of a side project as they help me to keep on top of new technologies, trends and tooling, which is why I wanted my Portfolio to be a little bit more involved than just a simple one pager. This is effectively my best practices sandbox, a place to test new tooling, libraries, frameworks etc. without restriction or fear of breaking something. A good example of this is the recent update to SSR and TypeScript, something I have been wanting to do for a while now. Anyway, enough waffle from me, lets dive into some more detail.

## About

Quirksmode is a fully responsive Universal (SSR) React Application designed to connect to a Headless CMS (not included here). It is composed of the following technologies:

- [React](https://facebook.github.io/react)
- [Redux](https://github.com/reactjs/redux)
- [Redux Toolkit](https://redux-toolkit.js.org)
- [React Router](https://reacttraining.com/react-router)
- [Connected React Router](https://github.com/supasate/connected-react-router)
- [React Spring](https://www.react-spring.io/docs/hooks/basics)
- [Webpack](https://webpack.js.org)
- [Node](https://nodejs.org/)
- [Express](https://expressjs.com)
- [TypeScript](https://www.typescriptlang.org)
- [axios](https://github.com/axios/axios)
- [react-helmet](https://github.com/nfl/react-helmet)
- [loadable-component](https://github.com/smooth-code/loadable-components)
- [React Hot Loader](https://github.com/gaearon/react-hot-loader)
- [Webpack Dev Middleware](https://github.com/webpack/webpack-dev-middleware)
- [Webpack Hot Middleware](https://github.com/glenjamin/webpack-hot-middleware)
- [Webpack Hot Server Middleware](https://github.com/60frames/webpack-hot-server-middleware#readme)
- [Webpack Bundle Analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)
- [helmet](https://github.com/helmetjs/helmet)
- [ESLint](http://eslint.org)
- [StyleLint](http://stylelint.io)
- [Prettier](https://prettier.io)
- [PostCSS](https://github.com/postcss/postcss-loader)
- [Workbox](https://developers.google.com/web/tools/workbox)
- [Jest](https://facebook.github.io/jest)
- [Docker](https://www.docker.com/)

## Key Features

- Universal React App (SSR)
- Redux for state management
- Automated bundling and code splitting with lazy loaded components
- Progressive Web App (Workbox)
- Hot Reloading
- Functional Components with Hooks
- Follows BEM methodology
- Pages and Components are grouped into namespaced folders/files

## Requirements

- [node](https://nodejs.org/en) == 12.15.0
- [npm](https://www.npmjs.com) >= 6.0

## Prerequisites

- Clone the repo

  ```sh
  git clone https://github.com/Quirksmode/quirksmode-v3-ui.git
  cd quirksmode-v3-ui
  ```

- (Optional) [Install Docker](https://www.docker.com/)

## How to run without Docker

Run Development build (with Hot Reload)

```sh
make watch
```

Run Production build

```sh
make build
```

## How to run with Docker

```sh
docker-compose up
```

## Roadmap

- Update Unit/Integration Tests to TS and improve coverage
- Add E2E Tests
- Improve CI/CD
- Update Readme
- Create custom Static Site Generator
