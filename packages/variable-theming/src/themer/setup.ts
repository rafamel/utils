import { IOutput } from '~/types';

const setup: IOutput = {
  styles: {
    fontFamily: 'var(--typography-primary-font-family)',
    fontSize: 'var(--typography-primary-font-size)',
    fontWeight: 'var(--typography-primary-font-weight)',
    lineHeight: 'var(--typography-primary-line-height)',
    letterSpacing: 'var(--typography-primary-letter-spacing)',
    fontStyle: 'var(--typography-primary-font-style)'
  },
  css: `
    font-family: var(--typography-primary-font-family);
    font-size: var(--typography-primary-font-size);
    font-weight: var(--typography-primary-font-weight);
    line-height: var(--typography-primary-line-height);
    letter-spacing: var(--typography-primary-letter-spacing);
    font-style: var(--typography-primary-font-style);
  `
};

export default setup;
