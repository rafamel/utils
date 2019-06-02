import { ITypography, IPalette } from '~/types';

const typography: Required<ITypography> = {
  fontFamily: 'inherit',
  fontSize: 'inherit',
  fontWeight: 'inherit',
  lineHeight: 'inherit',
  letterSpacing: 'inherit',
  fontStyle: 'inherit'
};

const palette: Required<IPalette> = {
  main: 'inherit',
  light: 'var(--typography-primary-main)',
  dark: 'var(--typography-primary-main)',
  contrast: 'inherit'
};

export default { typography, palette };
