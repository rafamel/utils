# proxy-handler

[![Version](https://img.shields.io/npm/v/proxy-handler.svg)](https://www.npmjs.com/package/proxy-handler)
[![Types](https://img.shields.io/npm/types/proxy-handler.svg)](https://www.npmjs.com/package/proxy-handler)
[![License](https://img.shields.io/github/license/rafamel/utils.svg)](https://github.com/rafamel/utils/blob/master/LICENSE)

> Proxy object handler implementation.

## Install

[`npm install proxy-handler`](https://www.npmjs.com/package/proxy-handler)

## Usage

The `Handler` class redirects to a *source* object by default for all handler methods. You can extend the `Handler` class or select certain calls to be disabled.

### new Handler(source: () => object, options?: object)

* `source`: a getter *function* returning the object to wrap to be run on each property access, unless memoized.
* `options`: an *object* with optional fields:
  * `memoize`: *boolean,* whether to memoize the `source` function.
  * `disable`: *object,* with optional keys of the methods to be disabled (`getPrototypeOf`, `setPrototypeOf`, `has`, `get`, `set`, etc) and *boolean* values.

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

const handler = new Handler(() => ({}), { memoize: true });
```

Or disable certain methods:

```javascript
import { Handler } from 'proxy-handler';

const item = { foo: 'foo' };
const handler = new Handler(() => item, { disable: { set: true } });
const wrap = new Proxy({}, handler);

wrap.foo = 'bar';
console.log(wrap.foo); // 'foo'
```

### Handler.proxy(source: () => object, options?: object)

We can achieve the same with `Handler.proxy`, which will return directly the proxy object, making it a little less verbose.

```javascript
import { Handler } from 'proxy-handler';

const item = { foo: 'foo' };
const wrap = Handler.proxy(() => item);

console.log(wrap.foo); // 'foo'
```
