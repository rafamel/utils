# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 0.1.0 (2020-02-09)


### Features

* **proxy-handler:** adds Handler ([a155911](https://github.com/rafamel/utils/commit/a1559113862b995ef3e1f97078086825444d7236))





# 0.1.0 (2020-02-09)


### Bug Fixes

* **deps:** updates dependencies ([1437456](https://github.com/rafamel/utils/commit/1437456d0d7a40c55fa89278e3ec4ee1c85eb6ad))
* updates setup and dependencies ([6ff9ce2](https://github.com/rafamel/utils/commit/6ff9ce2651f4d1600467a0a8f909653ed047b9ab))
* **aslug:** fixes readme and package urls to match utils repo ([060c967](https://github.com/rafamel/utils/commit/060c967b16c114d3605a2ec9b63dd814e8229d14))
* **deps:** update dependency lodash.mergewith to v4.6.2 [security] ([#6](https://github.com/rafamel/utils/issues/6)) ([428dfc6](https://github.com/rafamel/utils/commit/428dfc638cffbeb190d564af50fbadc2f5512374))
* **deps:** updates escape-string-regexp to v2.0.0 ([b826a4d](https://github.com/rafamel/utils/commit/b826a4db7e2d79e95914555d0bab628b15938389))
* **deps:** updates riseup for esnext fix ([f29d9d9](https://github.com/rafamel/utils/commit/f29d9d900cbd850e85322178d3afbd508d9ec4af))
* **merge-strategies:** shallow doesn't fail on null ([44998ce](https://github.com/rafamel/utils/commit/44998ce7beb16beb6378758837088facf3e57ab4))


### Code Refactoring

* **variable-theming:** themer takes an object with named keys ([cde510c](https://github.com/rafamel/utils/commit/cde510c6ea5d57016fe58eb97c60259fdc50bc11))


### Features

* **aslug:** adds 0 to the default alphabet ([40f9d3f](https://github.com/rafamel/utils/commit/40f9d3f747dd9e8ff561164bab46622cdeeacf1c))
* **has-key:** adds hasAnyKey ([b2c765e](https://github.com/rafamel/utils/commit/b2c765eb5f33b2fae5e958b4bfb44af3770269c8))
* **has-key:** adds hasAnyOwnKey ([124b1ef](https://github.com/rafamel/utils/commit/124b1ef85a188748a46fcdded21986f8c0afc6d5))
* **has-key:** adds hasKey ([8d1ddf9](https://github.com/rafamel/utils/commit/8d1ddf922cfdbbeecb822b9dfd88206f3f619efb))
* **has-key:** adds hasOwnKey ([4a539f0](https://github.com/rafamel/utils/commit/4a539f042d002032f410f6a39666bc0ce2d58b77))
* **merge-strategies:** implements strategies ([d629d01](https://github.com/rafamel/utils/commit/d629d0199213348aaedc4a72ec444c75e1be8b83))
* **proxy-handler:** adds Handler ([a155911](https://github.com/rafamel/utils/commit/a1559113862b995ef3e1f97078086825444d7236))
* **response-class:** implements Response ([d1c37bb](https://github.com/rafamel/utils/commit/d1c37bb78b73395f667a70dfc741b808737f71a5))
* **result-box:** adds Result.consume ([283ac92](https://github.com/rafamel/utils/commit/283ac920c12508446ea6f397f7f4fc64ee3cf8a3))
* **result-box:** adds Result.create ([7c884c9](https://github.com/rafamel/utils/commit/7c884c961ba24300e3f2c1991aaf32617805e628))
* **result-box:** allows Result.pass and Resut.fail arguments to be optional ([1f5435d](https://github.com/rafamel/utils/commit/1f5435dc09f7d0a89a77e422049b71d96e3cfaf1))
* **terminate-children:** implements terminateChildren ([2d563f8](https://github.com/rafamel/utils/commit/2d563f8a3cea16426544a3e98b42deebcc0ce37a))
* **variable-theming:** adds themer ([d3398b4](https://github.com/rafamel/utils/commit/d3398b4ef24eed7a2db6320a32528cb0be317312))
* **variable-theming:** allows for nested themes; api redesign ([a905a63](https://github.com/rafamel/utils/commit/a905a6394182a52ee14192bec078a8a86de1e310))
* **variable-theming:** allows for TItems to have inner undefined values ([b7cbcb4](https://github.com/rafamel/utils/commit/b7cbcb48f85049e13c1d99b8fabcebc3bb898b7e))
* **variable-theming:** imlements generate ([1ba42c5](https://github.com/rafamel/utils/commit/1ba42c54caec00d5c9b056adba158e043c419f6d))
* adds new aslug api and types ([cff8b6b](https://github.com/rafamel/utils/commit/cff8b6bb19c21eb7401acc62e3bbfb4a41b07531))
* implements decode ([6efc23c](https://github.com/rafamel/utils/commit/6efc23c2d57afcc8c8343d71ed4102fb75fb812d))
* implements encode ([26e821f](https://github.com/rafamel/utils/commit/26e821f5d4a5990c2153fd1402690ccd80c57ee4))


### BREAKING CHANGES

* **variable-theming:** The previous api has changed significantly. Please review the docs.
* **variable-theming:** variable-theming doesn't further export nth; themer no longer takes an array or
numbered objects for typography and palette
* The api has been completely redesigned. `aslug` can now both encode and decode
strings, and returns an object with methods `encode` and `decode`.
