[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![Discord](https://img.shields.io/discord/1070453198000767076)](https://discord.gg/dKWyyv6M)
<img src="https://img.shields.io/github/actions/workflow/status/pdmlab/ts-node-prettier-vscode-starter/ci.yml?branch=main" />

# ellert store

Ellert is an open source Event Store on top of Postgres.

## Installation

```bash
npm install ellert
```

## Usage

```typescript
import Ellert from 'ellert';

const poolConfig = {
  host: "localhost",
  port: 5432,
  database: "postgres",
  user: "postgres",
  password: "123456"
};

const ellert = await Ellert({ poolConfig });

const streamResult = await store.appendToStream("projectKickedOff", [
  {
    type: "projectKickedOff", data: {
      title: "Ellert"
    }, metadata: {}
  }
]);
```

## Why Ellert?

Ernst Ellert is a fictional character from the German science fiction series [Perry Rhodan](https://www.perrypedia.de/). He is a mutant and a teletemporarian. Teletemporation is the ability to physically travel through time... and that's what we do with events.

## Want to help?

This project is just getting off the ground and could use some help with cleaning things up and refactoring.

If you want to contribute - we'd love it! Just open an issue to work against, so you get full credit for your fork. You
can open the issue first, so we can discuss, and you can work your fork as we go along.

If you plan to distribute the code, keep the source code public to comply with AGPLv3. To clone in a private repository,
acquire a commercial license.

If you see a bug, please be so kind as to show how it's failing, and we'll do our best to get it fixed quickly.

Before sending a PR, please [create an issue](issues/new) to introduce your idea and have a reference for your PR.

We're using [conventional commits](https://www.conventionalcommits.org), so please use it for your commits as well.

Also, please add tests and make sure to run `npm run lint-ts` or `yarn lint-ts`.
