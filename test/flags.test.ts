import flags from '~/flags';
import { IOfType, IFlag } from '~/types';

const help = `
Usage: foo [options]

Command description

Options:
--foo                Foo
  --help             Show help
  --foo-bar          Foo bar
  --env <env>        Environment
  --file<path>       File path
  
  --version
  --bar-baz
  --log <level>
  --dir<path>

-b, --bar      Bar
  -v, --volumes           Clean volumes
  -z  ,  --baz            Baz
  -n, --no-detect         Disable detection
  -g, --glob <pattern>    Set glob pattern
  -e, --ext <extensions>  Set extensions

Examples:
foo --bar --file ./path
  foo --bar-baz --env test
`;

const items: IOfType<IFlag> = {
  '--foo': { description: 'Foo' },
  '--help': { description: 'Show help' },
  '--foo-bar': { description: 'Foo bar' },
  '--env': { description: 'Environment', argument: 'env' },
  '--file': { description: 'File path', argument: 'path' },

  '--version': { description: '' },
  '--bar-baz': { description: '' },
  '--log': { description: '', argument: 'level' },
  '--dir': { description: '', argument: 'path' },

  '--bar': { description: 'Bar', alias: '-b' },
  '--volumes': { description: 'Clean volumes', alias: '-v' },
  '--baz': { description: 'Baz', alias: '-z' },
  '--no-detect': { description: 'Disable detection', alias: '-n' },
  '--glob': {
    description: 'Set glob pattern',
    alias: '-g',
    argument: 'pattern'
  },
  '--ext': {
    description: 'Set extensions',
    alias: '-e',
    argument: 'extensions'
  }
};
const aliases: IOfType<string> = {
  '-b': '--bar',
  '-v': '--volumes',
  '-z': '--baz',
  '-n': '--no-detect',
  '-g': '--glob',
  '-e': '--ext'
};

test(`succeeds w/ mode = 'keep'`, () => {
  expect(flags(help)).toEqual({ flags: items, aliases });
  expect(flags(help, { mode: 'keep' })).toEqual({ flags: items, aliases });
});
test(`succeeds w/ mode = 'no-dash'`, () => {
  expect(flags(help, { mode: 'no-dash' })).toEqual({
    flags: Object.entries(items).reduce((acc: IOfType<IFlag>, [key, value]) => {
      acc[key.slice(2)] = {
        ...value,
        alias: value.alias ? value.alias.slice(1) : undefined
      };
      return acc;
    }, {}),
    aliases: Object.entries(aliases).reduce(
      (acc: IOfType<string>, [key, value]) => {
        acc[key.slice(1)] = value.slice(2);
        return acc;
      },
      {}
    )
  });
});
test(`succeeds w/ mode = 'camelcase'`, () => {
  const subs = (val: string): string => {
    switch (val) {
      case 'foo-bar':
        return 'fooBar';
      case 'bar-baz':
        return 'barBaz';
      case 'no-detect':
        return 'noDetect';
      default:
        return val;
    }
  };
  expect(flags(help, { mode: 'camelcase' })).toEqual({
    flags: Object.entries(items).reduce((acc: IOfType<IFlag>, [key, value]) => {
      acc[subs(key.slice(2))] = {
        ...value,
        alias: value.alias ? value.alias.slice(1) : undefined
      };
      return acc;
    }, {}),
    aliases: Object.entries(aliases).reduce(
      (acc: IOfType<string>, [key, value]) => {
        acc[key.slice(1)] = subs(value.slice(2));
        return acc;
      },
      {}
    )
  });
});
test(`fails w/ reverse order`, () => {
  expect(() =>
    flags(help.replace('-v, --volumes', '--volumes, -v'))
  ).toThrowError();
  expect(() =>
    flags(help.replace('-v, --volumes', '--volumes  , -v'))
  ).toThrowError();
  expect(() =>
    flags(help.replace('-v, --volumes', '--volumes <vol>, -v'))
  ).toThrowError();
  expect(() =>
    flags(help.replace('-v, --volumes', '--volumes, -v <vol>'))
  ).toThrowError();
  expect(() =>
    flags(help.replace('-v, --volumes', '--volumes, -vol'))
  ).toThrowError();
});
test(`fails w/ aliases with 2+ characters`, () => {
  expect(() => flags(help.replace('-v,', '-vo,'))).toThrowError();
  expect(() => flags(help.replace('-v,', '-vo  ,'))).toThrowError();
});
test(`fails w/ repeated flags`, () => {
  expect(() => flags(help.replace('--no-detect', '--foo'))).toThrowError();
});
test(`fails w/ repeated aliases`, () => {
  expect(() => flags(help.replace('-e,', '-n,'))).toThrowError();
});
test(`doesn't fail on safe = false`, () => {
  expect(() =>
    flags(help.replace('-v, --volumes', '--volumes, -v'), { safe: false })
  ).not.toThrowError();
  expect(() =>
    flags(help.replace('-v, --volumes', '--volumes  , -v'), { safe: false })
  ).not.toThrowError();
  expect(() =>
    flags(help.replace('-v, --volumes', '--volumes <vol>, -v'), { safe: false })
  ).not.toThrowError();
  expect(() =>
    flags(help.replace('-v, --volumes', '--volumes, -v <vol>'), { safe: false })
  ).not.toThrowError();
  expect(() =>
    flags(help.replace('-v, --volumes', '--volumes, -vol'), { safe: false })
  ).not.toThrowError();
  expect(() =>
    flags(help.replace('-v,', '-vo,'), { safe: false })
  ).not.toThrowError();
  expect(() =>
    flags(help.replace('-v,', '-vo  ,'), { safe: false })
  ).not.toThrowError();
  expect(() =>
    flags(help.replace('--no-detect', '--foo'), { safe: false })
  ).not.toThrowError();
  expect(() =>
    flags(help.replace('-e,', '-n,'), { safe: false })
  ).not.toThrowError();
});
