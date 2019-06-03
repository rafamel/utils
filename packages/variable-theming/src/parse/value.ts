import { TValue } from '~/types';

export default function parseValue(value: TValue): string | undefined {
  return ['string', 'number'].includes(typeof value) || value
    ? String(value)
    : undefined;
}
