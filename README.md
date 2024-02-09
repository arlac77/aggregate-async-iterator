[![npm](https://img.shields.io/npm/v/aggregate-async-iterator.svg)](https://www.npmjs.com/package/aggregate-async-iterator)
[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)
[![Typed with TypeScript](https://flat.badgen.net/badge/icon/Typed?icon=typescript\&label\&labelColor=blue\&color=555555)](https://typescriptlang.org)
[![bundlejs](https://deno.bundlejs.com/?q=aggregate-async-iterator\&badge=detailed)](https://bundlejs.com/?q=aggregate-async-iterator)
[![downloads](http://img.shields.io/npm/dm/aggregate-async-iterator.svg?style=flat-square)](https://npmjs.org/package/aggregate-async-iterator)
[![GitHub Issues](https://img.shields.io/github/issues/arlac77/aggregate-async-iterator.svg?style=flat-square)](https://github.com/arlac77/aggregate-async-iterator/issues)
[![Build Status](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Farlac77%2Faggregate-async-iterator%2Fbadge\&style=flat)](https://actions-badge.atrox.dev/arlac77/aggregate-async-iterator/goto)
[![Styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Known Vulnerabilities](https://snyk.io/test/github/arlac77/aggregate-async-iterator/badge.svg)](https://snyk.io/test/github/arlac77/aggregate-async-iterator)
[![Coverage Status](https://coveralls.io/repos/arlac77/aggregate-async-iterator/badge.svg)](https://coveralls.io/github/arlac77/aggregate-async-iterator)

# aggregate-async-iterator

Aggregates several async iterators into one (zip)

# usage

```js
import { aggregateRoundRobin, aggregateFifo } from "aggregate-async-iterator";

async function* sequence(name, time = 100, num = 10) {
  for (let i = 0; i < num; i += 1) {
    yield new Promise(resolve => setTimeout(resolve(name + i), time));
  }
}

console.log("RR:");

for await (const r of aggregateRoundRobin([
    sequence("A", 100, 3),
    sequence("B", 35, 5)
  ])) {
  console.log(r);
}

console.log("FIFO:");

for await (const r of aggregateFifo([
    sequence("A", 100, 3),
    sequence("B", 35, 5)
  ])) {
  console.log(r);
}
```

Prints interleaved sequences

```txt
RR:
A0
B0
A1
B1
A2
B2
B3
B4
FIFO:
A0
B0
A1
B1
A2
B2
B3
B4
```

# API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

*   [aggregateFifo](#aggregatefifo)
    *   [Parameters](#parameters)
*   [aggregateRoundRobin](#aggregateroundrobin)
    *   [Parameters](#parameters-1)

## aggregateFifo

Aggregate items from sevaral async iterators into one.
Items are collected first in first out from the sources.
Whatever source comes first will be delivered first.

### Parameters

*   `sources` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)\<AsyncIterator\<any>>**&#x20;

Returns **AsyncIterator\<any>** items collected from all sources

## aggregateRoundRobin

Aggregate items from sevaral async iterators into one.
Items are collected round robin from the sources.
The 2nd. round of items will only be delivered after all sources
have delivered their 1st. round (or reached their end).

### Parameters

*   `sources` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)\<AsyncIterator\<any>>**&#x20;

Returns **AsyncIterator\<any>** items collected from all sources

# install

With [npm](http://npmjs.org) do:

```shell
npm install aggregate-async-iterator
```

# license

BSD-2-Clause
