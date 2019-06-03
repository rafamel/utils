import flatten from 'flat';
import decamelize from 'decamelize';
import parseValue from './value';
import { ITheme, TValue, IOfType } from '~/types';

export default function parseTheme(
  theme: ITheme,
  fn: (variable: string, value: string) => void
): void {
  const flat: IOfType<TValue> = flatten(theme, { delimiter: '-' });
  const entries = Object.entries(flat);
  for (let [camelName, rawValue] of entries) {
    const name = decamelize(camelName, '-');
    const value = parseValue(rawValue);
    if (value) fn('--' + name, value);
  }
}
