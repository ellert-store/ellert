# Getting started

`ellert` is an open source Event Store on top of Postgres.

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