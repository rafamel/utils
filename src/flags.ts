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
    if (!match.sub[1]) continue;

    // Key
    const key =
      // prettier-ignore
      opts.mode === 'no-dash' ? match.sub[1].slice(2)
        : opts.mode === 'camelcase' ? camelcase(match.sub[1]) : match.sub[1];
    if (opts.safe && flags.hasOwnProperty(key)) {
      throw Error(`Flag ${key} found twice`);
    }

    // description
    const item: IFlag = {
      description: match.sub[3] ? match.sub[3].trim() : ''
    };

    // alias
    if (match.sub[0]) {
      if (opts.safe && match.sub[0].length > 2) {
        throw Error(`Aliases must be a single character`);
      }
      item.alias =
        opts.mode === 'no-dash' || opts.mode === 'camelcase'
          ? match.sub[0].slice(1)
          : match.sub[0];

      if (opts.safe && aliases.hasOwnProperty(item.alias)) {
        throw Error(`Alias ${item.alias} found twice`);
      }
      aliases[item.alias] = key;
    }

    // argument
    if (match.sub[2]) {
      item.argument = match.sub[2].trim().slice(1, -1);
    }

    flags[key] = item;
  }

  return { options: flags, aliases };
}
