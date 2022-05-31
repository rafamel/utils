# equal-strategies

[![Version](https://img.shields.io/npm/v/equal-strategies.svg)](https://www.npmjs.com/package/equal-strategies)
[![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/equal-strategies.svg)](https://snyk.io/test/npm/equal-strategies)
[![License](https://img.shields.io/github/license/rafamel/utils.svg)](https://github.com/rafamel/equal-strategies/blob/master/LICENSE)
[![Types](https://img.shields.io/npm/types/equal-strategies.svg)](https://www.npmjs.com/package/equal-strategies)

> Equality evaluation strategies.

## Install

[`npm install equal-strategies`](https://www.npmjs.com/package/equal-strategies)

## Usage

### Strategies

There are four comparison strategies:

#### `strict(value: any, query: any): boolean`

Simple strict equality comparison.

#### `partial(value: any, query: any): boolean`

Shallow equality comparison that ignores any missing properties in `value` and strict compares *arrays*.

#### `shallow(value: any, query: any): boolean`

Shallow equality comparison.

#### `deep(value: any, query: any): boolean`

Deep equality comparison.

### Utils

#### `compare(kind: string, value: any, query: any): boolean`

A conveniency function, with `kind` being either `"strict"`, `"partial"`, `"shallow"`, or `"deep"`.
