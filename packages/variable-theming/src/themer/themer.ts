import generate from '~/generate';
import defaults from './defaults';
import nth from './get-nth';
import { ITheme, ITypography, IPalette, IOutput, IOfType } from '~/types';

export default function themer(theme?: ITheme): IOutput {
  const { typography, palette, group } = Object.assign(
    { typography: [], palette: [], group: {} },
    theme
  );

  const custom: IOfType<IOfType<string>> = { ...group };
  // Typography
  let nt = Array.isArray(typography)
    ? typography.length
    : Number(Object.keys(typography).sort((a, b) => Number(b) - Number(a))[0]) +
        1 || 0;

  for (let i = 0; i < nt; i++) {
    const item = (typography[i] || {}) as ITypography;
    custom[`typography-${nth(i)}`] = {
      ...defaults.typography,
      ...item
    };
  }
  // Palette
  let np = Array.isArray(palette)
    ? palette.length
    : Number(Object.keys(palette).sort((a, b) => Number(b) - Number(a))[0]) +
        1 || 0;

  for (let i = 0; i < np; i++) {
    const item = (palette[i] || {}) as IPalette;
    custom[`palette-${nth(i)}`] = {
      ...defaults.palette,
      ...item
    };
  }

  const response = generate({}, custom);
  delete response.setup;
  return response;
}
