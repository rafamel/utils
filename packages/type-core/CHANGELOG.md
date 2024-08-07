# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [0.15.0](https://github.com/rafamel/utils/compare/type-core@0.14.0...type-core@0.15.0) (2024-07-29)

### Bug Fixes

* **type-core:** set TypeGuard.isFunction guard to more permissive type ([3652b6b](https://github.com/rafamel/utils/commit/3652b6bfd7be90f6fa9c0b7f8b6194117d7474cf))

### Features

* **type-core:** add Constructor type ([40090b4](https://github.com/rafamel/utils/commit/40090b4a253cfaa4703369bc5f12d94904d1af57))
* **type-core:** set any as default type for Promisables ([ebc0c21](https://github.com/rafamel/utils/commit/ebc0c21ab56ba66f5a177fedf3b8f3569fb321da))

# [0.14.0](https://github.com/rafamel/utils/compare/type-core@0.13.0...type-core@0.14.0) (2024-07-17)

### Features

* **type-core:** simplify types and utilities ([9e54cae](https://github.com/rafamel/utils/commit/9e54cae8de5f882023e65bf6bfc8067bb3464dbe))

### BREAKING CHANGES

* **type-core:** Please check the latest documentation

# [0.13.0](https://github.com/rafamel/utils/compare/type-core@0.12.0...type-core@0.13.0) (2022-05-31)

### Bug Fixes

* update setup and dependencies; pure esm build; require node 18 ([b516240](https://github.com/rafamel/utils/commit/b5162408aa497ab5129eae08b2a708259d5b32c1))

### BREAKING CHANGES

* all packages are now pure ESM, while node 18 is also required.

# [0.12.0](https://github.com/rafamel/utils/compare/type-core@0.11.0...type-core@0.12.0) (2021-04-30)

### improvement

* **type-core:** rename Retype and Nullable to more descriptive Index and Nullish ([1fce3e6](https://github.com/rafamel/utils/commit/1fce3e6dc27b68bd933f17abef9b33bd4dcf03d0))

### BREAKING CHANGES

* **type-core:** Retype and Nullable are renamed to Index and Nullish

# [0.11.0](https://github.com/rafamel/utils/compare/type-core@0.10.0...type-core@0.11.0) (2021-04-30)

### improvement

* **type-core:** rename Redefine type to more descriptive Retype ([104ef98](https://github.com/rafamel/utils/commit/104ef98eeec12a18531d0d4f254d12d4f912b81a))

### BREAKING CHANGES

* **type-core:** Redefine type has been renamed to Retype

# [0.10.0](https://github.com/rafamel/utils/compare/type-core@0.9.0...type-core@0.10.0) (2021-04-30)

### Features

* **type-core:** add Nullable type and TypeGuard.isNullable method ([70844a3](https://github.com/rafamel/utils/commit/70844a3e7a2028d9f3ba4b2da43f373e8a03c604))
* **type-core:** add Redefine type ([b7f95de](https://github.com/rafamel/utils/commit/b7f95de56f5f0dedd85b49eee5d7d6a174a2b0d0))

### improvement

* **type-core:** rename Members type to more descriptive Dictionary ([190bf81](https://github.com/rafamel/utils/commit/190bf8164c4d52f65994538a2b2832def72cd336))

### BREAKING CHANGES

* **type-core:** Members type has been renamed to Dictionary

# [0.9.0](https://github.com/rafamel/utils/compare/type-core@0.8.0...type-core@0.9.0) (2021-04-09)

### Features

* **type-core:** add Deep.Required and Deep.Partial types ([beb4c9e](https://github.com/rafamel/utils/commit/beb4c9ea77d85836a579557ff40de9c3095cc03a))

# [0.8.0](https://github.com/rafamel/utils/compare/type-core@0.7.0...type-core@0.8.0) (2021-01-18)

### Features

* **type-core:** adds Generalize type and Serial types ([af95617](https://github.com/rafamel/utils/commit/af956178cf76d70f5607601f66d45a7ecd0604db))

# [0.7.0](https://github.com/rafamel/utils/compare/type-core@0.6.0...type-core@0.7.0) (2020-12-11)

### Features

* **type-core:** adds isAsyncIterable to TypeGuard ([7514833](https://github.com/rafamel/utils/commit/75148336ad55f45cab0ea4be9bfcddb98bf8af84))

# [0.6.0](https://github.com/rafamel/utils/compare/type-core@0.5.0...type-core@0.6.0) (2020-12-09)

### Features

* **type-core:** defines ID and implements TypeGuard.isID ([2acbe26](https://github.com/rafamel/utils/commit/2acbe26213c843bb1efa6b9be2ba6c1b08c94ef6))

# [0.5.0](https://github.com/rafamel/utils/compare/type-core@0.4.0...type-core@0.5.0) (2020-12-06)

### Features

* **type-core:** adds KeyOf and ValueOf types ([52b92c7](https://github.com/rafamel/utils/commit/52b92c7c599adf7edf84cb533671bbd8408d56f9))

# [0.4.0](https://github.com/rafamel/utils/compare/type-core@0.3.0...type-core@0.4.0) (2020-12-06)

### Features

* **type-core:** adds Constructor definition ([fa3694f](https://github.com/rafamel/utils/commit/fa3694f65bb34c4219d0d8946346d7582b9887bf))

# [0.3.0](https://github.com/rafamel/utils/compare/type-core@0.2.0...type-core@0.3.0) (2020-11-30)

### Features

* **type-core:** adds MaybePromise and Optional types ([b603fae](https://github.com/rafamel/utils/commit/b603faecc73545e9f289486f6c9e807683a4a30a))

# [0.2.0](https://github.com/rafamel/utils/compare/type-core@0.1.0...type-core@0.2.0) (2020-11-29)

### Bug Fixes

* **type-core:** fixes isIterable ([be061e4](https://github.com/rafamel/utils/commit/be061e4aed33d66a1b1b7ec8e5cb81aa4d311957))

### Features

* **type-core:** adds isEventEmitterLike, isEventEmitter, isEventTarget to TypeGuard ([a8438e6](https://github.com/rafamel/utils/commit/a8438e6d5e9bfacebcda73bf778899dbcfd10611))

# 0.1.0 (2020-11-28)

### Features

* **type-core:** adds TypeGuard ([b3ae2a1](https://github.com/rafamel/utils/commit/b3ae2a156d55fd488eaa73426d5209a27135f3e9))
* **type-core:** adds types ([4e86ca4](https://github.com/rafamel/utils/commit/4e86ca462c755e8e91f2827601d4dcac57801d86))
