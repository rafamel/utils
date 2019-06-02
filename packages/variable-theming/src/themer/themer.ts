import generate from '~/generate';
import defaults from './defaults';
import { ITheme, IOutput, IOfType } from '~/types';

export default function themer(theme?: ITheme): IOutput {
  const { typography, palette, group } = Object.assign(
    { typography: [], palette: [], group: {} },
    theme
  );

  const custom: IOfType<IOfType<string>> = {
    ...group,
    'typography-primary': { ...defaults.typography },
    'palette-primary': { ...defaults.palette }
  };

  // Typography
  const te = Object.entries(typography);
  for (let [key, value] of te) {
    custom[`typography-${key}`] = {
      ...defaults.typography,
      ...(value || {})
    };
  }

  // Palette
  const pe = Object.entries(palette);
  for (let [key, value] of pe) {
    custom[`palette-${key}`] = {
      ...defaults.palette,
      ...(value || {})
    };
  }

  const response = generate({}, custom);
  delete response.setup;
  return response;
}
