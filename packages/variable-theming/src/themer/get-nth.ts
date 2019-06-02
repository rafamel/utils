import ordinal from 'ordinal';

export default function nth(n: number): string {
  switch (n) {
    case 0:
      return 'primary';
    case 1:
      return 'secondary';
    case 2:
      return 'tertiary';
    case 3:
      return 'quaternary';
    case 4:
      return 'quinary';
    case 5:
      return 'senary';
    case 6:
      return 'septenary';
    case 7:
      return 'octonary';
    case 8:
      return 'nonary';
    case 9:
      return 'denary';
    default:
      return ordinal(n + 1);
  }
}
