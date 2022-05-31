# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [0.3.0](https://github.com/rafamel/utils/compare/merge-strategies@0.2.0...merge-strategies@0.3.0) (2022-05-31)


### Bug Fixes

* update setup and dependencies; pure esm build; require node 18 ([b516240](https://github.com/rafamel/utils/commit/b5162408aa497ab5129eae08b2a708259d5b32c1))


### BREAKING CHANGES

* all packages are now pure ESM, while node 18 is also required.





# [0.2.0](https://github.com/rafamel/utils/compare/merge-strategies@0.1.6...merge-strategies@0.2.0) (2021-04-02)


### Bug Fixes

* **merge-strategies:** fix shallow inconsistent behavior ([b1ddffc](https://github.com/rafamel/utils/commit/b1ddffc065cc057d7bf8de272394c70a791e08d2))
* **merge-strategies:** fixes array handling for merge and deep ([3023820](https://github.com/rafamel/utils/commit/3023820b7e221d0d0e1854e6638f5b79d2e78e1b))


### BREAKING CHANGES

* **merge-strategies:** The shallow function will now assign to keys in any inner data object with an
undefined value its value at the defaults object, if any. Previously, the merge and deep functions
did already behave in this manner. As a product of the alignment in behavior with merge and deep,
there might be additional edge cases in which the usage of shallow might break your implementation.
It is suggested that you test your use case after upgrading.
* **merge-strategies:** Any usage of the merge or deep functions that relies on the mutation of the
returned object to mutate the defaults argument will cease working. Mutations to the returned object
won't have an effect over defaults.





## [0.1.6](https://github.com/rafamel/utils/compare/merge-strategies@0.1.5...merge-strategies@0.1.6) (2020-02-19)

**Note:** Version bump only for package merge-strategies





## [0.1.5](https://github.com/rafamel/utils/compare/merge-strategies@0.1.4...merge-strategies@0.1.5) (2019-11-11)


### Bug Fixes

* updates setup and dependencies ([6ff9ce2](https://github.com/rafamel/utils/commit/6ff9ce2651f4d1600467a0a8f909653ed047b9ab))
* **deps:** update dependency lodash.mergewith to v4.6.2 [security] ([#6](https://github.com/rafamel/utils/issues/6)) ([428dfc6](https://github.com/rafamel/utils/commit/428dfc638cffbeb190d564af50fbadc2f5512374))





## [0.1.4](https://github.com/rafamel/utils/compare/merge-strategies@0.1.3...merge-strategies@0.1.4) (2019-07-03)

**Note:** Version bump only for package merge-strategies





## [0.1.3](https://github.com/rafamel/utils/compare/merge-strategies@0.1.2...merge-strategies@0.1.3) (2019-06-30)


### Bug Fixes

* **merge-strategies:** shallow doesn't fail on null ([44998ce](https://github.com/rafamel/utils/commit/44998ce))





## [0.1.2](https://github.com/rafamel/utils/compare/merge-strategies@0.1.1...merge-strategies@0.1.2) (2019-06-02)

**Note:** Version bump only for package merge-strategies





## [0.1.1](https://github.com/rafamel/utils/compare/merge-strategies@0.1.0...merge-strategies@0.1.1) (2019-05-16)

**Note:** Version bump only for package merge-strategies


# 0.1.0 (2019-05-08)


### Features

* **merge-strategies:** implements strategies ([d629d01](https://github.com/rafamel/utils/commit/d629d01))
