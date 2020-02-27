# proxy-handler

[![Version](https://img.shields.io/npm/v/proxy-handler.svg)](https://www.npmjs.com/package/proxy-handler)
[![Build Status](https://img.shields.io/travis/rafamel/utils/master.svg)](https://travis-ci.org/rafamel/utils)
[![Coverage](https://img.shields.io/coveralls/rafamel/utils/master.svg)](https://coveralls.io/github/rafamel/utils)
[![Dependencies](https://img.shields.io/david/rafamel/utils.svg?path=packages%2Fproxy-handler)](https://david-dm.org/rafamel/utils.svg?path=packages%2Fproxy-handler)
[![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/proxy-handler.svg)](https://snyk.io/test/npm/proxy-handler)
[![License](https://img.shields.io/github/license/rafamel/utils.svg)](https://github.com/rafamel/utils/blob/master/LICENSE)
[![Types](https://img.shields.io/npm/types/proxy-handler.svg)](https://www.npmjs.com/package/proxy-handler)

> Proxy object handler implementation.

## Install

[`npm install proxy-handler`](https://www.npmjs.com/package/proxy-handler)

## Usage

The `Handler` class redirects to a *source* object by default for all handler methods. You can extend the `Handler` class or select certain calls to be disabled.

### new Handler(source: () => object, memoize?: boolean, disable?: object)

As a verbose example without deselecting any methods:

```javascript
import { Handler } from 'proxy-handler';

let item = { foo: 'foo' };
const handler = new Handler(() => item);
const wrap = new Proxy({}, handler);

console.log(wrap.foo); // 'foo'

wrap.foo = 'bar';
console.log(wrap.foo); // 'bar'
console.log(item.foo); // 'bar'

item = { foo: 'baz' };
console.log(wrap.foo); // 'baz'
```

We can also make the source getter run once, when the first property is accessed:

```javascript
import { Handler } from 'proxy-handler';

const handler = new Handler(() => ({}), true);
```

Or disable certain methods:

```javascript
import { Handler } from 'proxy-handler';

const item = { foo: 'foo' };
const handler = new Handler(() => item, false, { set: true });
const wrap = new Proxy({}, handler);

wrap.foo = 'bar';
console.log(wrap.foo); // 'foo'
```

### Handler.proxy(source: () => object, memoize?: boolean, disable?: object)

We can achieve the same with `Handler.proxy`, which will return directly the proxy object, making it a little less verbose.

```javascript
import { Handler } from 'proxy-handler';

const item = { foo: 'foo' };
const wrap = Handler.proxy(() => item);

console.log(wrap.foo); // 'foo'
```
