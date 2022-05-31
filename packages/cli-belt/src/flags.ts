import execall from 'execall';
import camelcase from 'camelcase';

export interface Flag {
  alias?: string;
  argument?: string;
  description: string;
}

export interface FlagsOptions {
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
export function flags(
  help: string,
  options?: FlagsOptions
): { options: Record<string, Flag>; aliases: Record<string, string> } {
  const opts = Object.assign({ safe: true, mode: 'keep' }, options);

  if (
    opts.safe &&
    /\s*--([a-z-]*)\s*(<[\sa-z-]*>)?,\s*-([a-z-]*)/i.test(help)
  ) {
    throw new Error(`Alias found last in help -should be first`);
  }

  const aliases: Record<string, string> = {};
  const flags: Record<string, Flag> = {};

  const regex =
    /[\n\r]\s*(?:(-[a-z-]+)[\t ]*,[\t ]*)?(--[a-z-]+)(\s*<.*>)?( +.*)?$/gim;
  const matches = execall(regex, help);
  for (const match of matches) {
    const sub = match.subMatches;

    if (!sub[1]) continue;

    // Key
    const key =
      // prettier-ignore
      opts.mode === 'no-dash' ? sub[1].slice(2)
        : opts.mode === 'camelcase' ? camelcase(sub[1]) : sub[1];
    if (opts.safe && Object.hasOwnProperty.call(flags, key)) {
      throw new Error(`Flag ${key} found twice`);
    }

    // description
    const item: Flag = {
      description: sub[3] ? sub[3].trim() : ''
    };

    // alias
    if (sub[0]) {
      if (opts.safe && sub[0].length > 2) {
        throw new Error(`Aliases must be a single character`);
      }
      item.alias =
        opts.mode === 'no-dash' || opts.mode === 'camelcase'
          ? sub[0].slice(1)
          : sub[0];

      if (opts.safe && Object.hasOwnProperty.call(aliases, item.alias)) {
        throw new Error(`Alias ${item.alias} found twice`);
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
