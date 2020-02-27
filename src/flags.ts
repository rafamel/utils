import execall from 'execall';
import camelcase from 'camelcase';
import { IOfType, IFlag } from './types';

export interface IFlagsOpts {
  /**
   * If false, `flags` won't perform safety checks. Default: `true`.
   */
  safe?: boolean;
  /**
   * `'keep'` will maintain all names as they are; `'no-dash'` will remove the initial flag dashes; `'camelcase'` will remove initial dashes and camelcase flags. Default: `'keep'`.
   */
  mode?: 'keep' | 'no-dash' | 'camelcase';
}

/**
 * Parses a `help` string and returns an object with options, aliases, arugments, and descriptions.
 */
export default function flags(
  help: string,
  options?: IFlagsOpts
): { options: IOfType<IFlag>; aliases: IOfType<string> } {
  const opts = Object.assign({ safe: true, mode: 'keep' }, options);

  if (opts.safe) {
    if (/\s*--([a-z-]*)\s*(<[a-z-\s]*>)?,\s*-([a-z-]*)/i.exec(help)) {
      throw Error(`Alias found last in help -should be first`);
    }
  }

  const aliases: IOfType<string> = {};
  const flags: IOfType<IFlag> = {};

  const regex = /[\n\r]\s*(?:(-[a-z-]+)[ \t]*,[ \t]*)?(--[a-z-]+)(\s*<.*>)?( +.*)?$/gim;
  const matches = execall(regex, help);
  for (let match of matches) {
    const sub = match.subMatches;

    if (!sub[1]) continue;

    // Key
    const key =
      // prettier-ignore
      opts.mode === 'no-dash' ? sub[1].slice(2)
        : opts.mode === 'camelcase' ? camelcase(sub[1]) : sub[1];
    if (opts.safe && flags.hasOwnProperty(key)) {
      throw Error(`Flag ${key} found twice`);
    }

    // description
    const item: IFlag = {
      description: sub[3] ? sub[3].trim() : ''
    };

    // alias
    if (sub[0]) {
      if (opts.safe && sub[0].length > 2) {
        throw Error(`Aliases must be a single character`);
      }
      item.alias =
        opts.mode === 'no-dash' || opts.mode === 'camelcase'
          ? sub[0].slice(1)
          : sub[0];

      if (opts.safe && aliases.hasOwnProperty(item.alias)) {
        throw Error(`Alias ${item.alias} found twice`);
      }
      aliases[item.alias] = key;
    }

    // argument
    if (sub[2]) {
      item.argument = sub[2].trim().slice(1, -1);
    }

    flags[key] = item;
  }

  return { options: flags, aliases };
}
